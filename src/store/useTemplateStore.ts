import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  templates: string[]; // Template IDs
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

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: [],
      frameworks: [],
      
      // Template actions
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
          // Also remove from any frameworks
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
      
      // Framework actions
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
      
      // Export/Import
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
            ...framework,
            id: undefined, // Remove ID for import
          },
          templates: templates.map((t) => ({
            ...t,
            id: undefined, // Remove ID for import
          })),
        };
        
        return JSON.stringify(exportData, null, 2);
      },
      
      importFramework: (jsonData) => {
        try {
          const data = JSON.parse(jsonData);
          
          if (!data.framework || !data.templates) {
            return { success: false, message: 'Invalid framework file format' };
          }
          
          // Import templates first
          const templateIdMap: Record<string, string> = {};
          const importedTemplates: SavedTemplate[] = [];
          
          for (const template of data.templates) {
            const newId = generateId();
            templateIdMap[template.name] = newId;
            importedTemplates.push({
              ...template,
              id: newId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
          
          // Import framework with new template IDs
          const frameworkId = generateId();
          const importedFramework: CustomFramework = {
            ...data.framework,
            id: frameworkId,
            templates: importedTemplates.map((t) => t.id),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          set((state) => ({
            templates: [...state.templates, ...importedTemplates],
            frameworks: [...state.frameworks, importedFramework],
          }));
          
          return {
            success: true,
            message: `Successfully imported "${importedFramework.name}" with ${importedTemplates.length} templates`,
            frameworkId,
          };
        } catch (error) {
          return { success: false, message: 'Failed to parse framework file' };
        }
      },
    }),
    {
      name: 'component-templates-storage',
    }
  )
);
