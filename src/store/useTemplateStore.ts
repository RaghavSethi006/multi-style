import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';
import { ComponentConfig } from './useCustomizationStore';

export interface SavedTemplate {
  id: string;
  name: string;
  description: string;
  componentType: string;
  componentCategory: string;
  config: Partial<ComponentConfig>;
  createdAt: string;
  updatedAt: string;
}

export interface CustomFramework {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  templates: string[];
  createdAt: string;
  updatedAt: string;
}

interface TemplateState {
  templates: SavedTemplate[];
  frameworks: CustomFramework[];

  // Template actions
  saveTemplate: (template: Omit<SavedTemplate, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateTemplate: (id: string, updates: Partial<Omit<SavedTemplate, 'id' | 'createdAt'>>) => void;
  deleteTemplate: (id: string) => void;
  duplicateTemplate: (id: string) => string;
  getTemplateById: (id: string) => SavedTemplate | undefined;
  getTemplatesByComponent: (componentType: string) => SavedTemplate[];

  // Framework actions
  createFramework: (framework: Omit<CustomFramework, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateFramework: (id: string, updates: Partial<Omit<CustomFramework, 'id' | 'createdAt'>>) => void;
  deleteFramework: (id: string) => void;
  addTemplatesToFramework: (frameworkId: string, templateIds: string[]) => void;
  removeTemplateFromFramework: (frameworkId: string, templateId: string) => void;
  getFrameworkById: (id: string) => CustomFramework | undefined;

  // Export/Import
  exportFramework: (frameworkId: string) => string | null;
  importFramework: (jsonData: string) => { success: boolean; message: string; frameworkId?: string };
}

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 11)}`;
};

const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function stripUnsafeKeys<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => stripUnsafeKeys(item)) as unknown as T;
  }
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (!FORBIDDEN_KEYS.has(key)) {
      clean[key] = stripUnsafeKeys(value);
    }
  }
  return clean as T;
}

const importedTemplateSchema = z.object({
  name: z.string().trim().min(1).max(120),
  description: z.string().max(500).optional().default(''),
  componentType: z.string().trim().min(1).max(80),
  componentCategory: z.string().trim().min(1).max(80),
  config: z.record(z.unknown()).default({}),
});

const importedFrameworkSchema = z.object({
  version: z.string().optional(),
  exportedAt: z.string().optional(),
  framework: z.object({
    name: z.string().trim().min(1).max(120),
    description: z.string().max(500).optional().default(''),
    version: z.string().trim().max(32).optional().default('1.0.0'),
    author: z.string().trim().max(120).optional().default(''),
    templates: z.array(z.string()).optional(),
  }),
  templates: z.array(importedTemplateSchema).max(200),
});

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: [],
      frameworks: [],

      saveTemplate: (template) => {
        const id = generateId();
        const now = new Date().toISOString();
        const newTemplate: SavedTemplate = {
          ...template,
          id,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ templates: [...state.templates, newTemplate] }));
        return id;
      },

      updateTemplate: (id, updates) => {
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        }));
      },

      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
          frameworks: state.frameworks.map((f) => ({
            ...f,
            templates: f.templates.filter((tid) => tid !== id),
          })),
        }));
      },

      duplicateTemplate: (id) => {
        const template = get().templates.find((t) => t.id === id);
        if (!template) return '';

        const newId = generateId();
        const now = new Date().toISOString();
        const duplicate: SavedTemplate = {
          ...template,
          id: newId,
          name: `${template.name} (Copy)`,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ templates: [...state.templates, duplicate] }));
        return newId;
      },

      getTemplateById: (id) => get().templates.find((t) => t.id === id),

      getTemplatesByComponent: (componentType) =>
        get().templates.filter((t) => t.componentType === componentType),

      createFramework: (framework) => {
        const id = generateId();
        const now = new Date().toISOString();
        const newFramework: CustomFramework = {
          ...framework,
          id,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ frameworks: [...state.frameworks, newFramework] }));
        return id;
      },

      updateFramework: (id, updates) => {
        set((state) => ({
          frameworks: state.frameworks.map((f) =>
            f.id === id ? { ...f, ...updates, updatedAt: new Date().toISOString() } : f
          ),
        }));
      },

      deleteFramework: (id) => {
        set((state) => ({
          frameworks: state.frameworks.filter((f) => f.id !== id),
        }));
      },

      addTemplatesToFramework: (frameworkId, templateIds) => {
        set((state) => ({
          frameworks: state.frameworks.map((f) =>
            f.id === frameworkId
              ? {
                  ...f,
                  templates: [...new Set([...f.templates, ...templateIds])],
                  updatedAt: new Date().toISOString(),
                }
              : f
          ),
        }));
      },

      removeTemplateFromFramework: (frameworkId, templateId) => {
        set((state) => ({
          frameworks: state.frameworks.map((f) =>
            f.id === frameworkId
              ? {
                  ...f,
                  templates: f.templates.filter((id) => id !== templateId),
                  updatedAt: new Date().toISOString(),
                }
              : f
          ),
        }));
      },

      getFrameworkById: (id) => get().frameworks.find((f) => f.id === id),

      exportFramework: (frameworkId) => {
        const framework = get().frameworks.find((f) => f.id === frameworkId);
        if (!framework) return null;

        const templates = get().templates.filter((t) =>
          framework.templates.includes(t.id)
        );

        const exportData = {
          version: '1.0',
          exportedAt: new Date().toISOString(),
          framework: {
            name: framework.name,
            description: framework.description,
            version: framework.version,
            author: framework.author,
            templates: framework.templates,
          },
          templates: templates.map((t) => ({
            name: t.name,
            description: t.description,
            componentType: t.componentType,
            componentCategory: t.componentCategory,
            config: t.config,
          })),
        };

        return JSON.stringify(exportData, null, 2);
      },

      importFramework: (jsonData) => {
        if (!jsonData || jsonData.length > 2_000_000) {
          return { success: false, message: 'Framework file is empty or exceeds 2MB limit.' };
        }
        try {
          const raw = stripUnsafeKeys(JSON.parse(jsonData));
          const parsed = importedFrameworkSchema.safeParse(raw);

          if (!parsed.success) {
            const firstIssue = parsed.error.issues[0];
            return {
              success: false,
              message: `Invalid framework file format${firstIssue ? `: ${firstIssue.path.join('.')} (${firstIssue.message})` : ''}`,
            };
          }

          const now = new Date().toISOString();
          const importedTemplates: SavedTemplate[] = parsed.data.templates.map((template) => ({
            id: generateId(),
            name: template.name,
            description: template.description,
            componentType: template.componentType,
            componentCategory: template.componentCategory,
            config: template.config as Partial<ComponentConfig>,
            createdAt: now,
            updatedAt: now,
          }));

          const frameworkId = generateId();
          const importedFramework: CustomFramework = {
            id: frameworkId,
            name: parsed.data.framework.name,
            description: parsed.data.framework.description,
            version: parsed.data.framework.version || '1.0.0',
            author: parsed.data.framework.author,
            templates: importedTemplates.map((t) => t.id),
            createdAt: now,
            updatedAt: now,
          };

          set((state) => ({
            templates: [...state.templates, ...importedTemplates],
            frameworks: [...state.frameworks, importedFramework],
          }));

          return {
            success: true,
            message: `Successfully imported "${importedFramework.name}" with ${importedTemplates.length} template${importedTemplates.length === 1 ? '' : 's'}`,
            frameworkId,
          };
        } catch {
          return { success: false, message: 'Failed to parse framework file as valid JSON' };
        }
      },
    }),
    {
      name: 'component-templates-storage',
    }
  )
);
