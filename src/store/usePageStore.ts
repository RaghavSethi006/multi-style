import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  buildComponentConfig,
  ComponentConfig,
  ComponentState,
  getCategoryForComponent,
  StateStyles,
} from './useCustomizationStore';
import type { SavedTemplate } from './useTemplateStore';

export type PageLayoutMode = 'stack' | 'grid';
export type NodeAlignment = 'start' | 'center' | 'end' | 'stretch';

export interface PageSettings {
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
  maxWidth: number;
  padding: number;
  gap: number;
  layoutMode: PageLayoutMode;
  gridColumns: 1 | 2 | 3;
}

export interface PageNode {
  id: string;
  name: string;
  componentType: string;
  category: string;
  config: ComponentConfig;
  activeState: ComponentState;
  colSpan: 1 | 2 | 3;
  align: NodeAlignment;
}

export const defaultPageSettings: PageSettings = {
  name: 'LandingPage',
  title: 'My Custom Page',
  description: 'Composed visually with Universal Component Customizer',
  backgroundColor: '#FFFFFF',
  maxWidth: 1120,
  padding: 32,
  gap: 24,
  layoutMode: 'stack',
  gridColumns: 2,
};

const generateNodeId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `node-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
};

export function createUniqueNodeName(baseName: string, existingNames: string[]): string {
  const cleanBase = baseName.trim() || 'Component';
  const taken = new Set(existingNames.map((n) => n.trim().toLowerCase()));
  if (!taken.has(cleanBase.toLowerCase())) {
    return cleanBase;
  }
  let counter = 2;
  while (taken.has(`${cleanBase} ${counter}`.toLowerCase())) {
    counter += 1;
  }
  return `${cleanBase} ${counter}`;
}

interface PageState {
  pageSettings: PageSettings;
  nodes: PageNode[];
  selectedNodeId: string | null;

  addNode: (
    componentType: string,
    category?: string,
    overrides?: Partial<ComponentConfig>,
    customName?: string
  ) => string;
  importTemplate: (template: SavedTemplate) => string;
  selectNode: (id: string | null) => void;
  updateNodeConfig: (id: string, updates: Partial<ComponentConfig>) => void;
  updateNodeStateStyles: (
    id: string,
    stateName: keyof ComponentConfig['stateStyles'],
    updates: Partial<StateStyles>
  ) => void;
  setNodeActiveState: (id: string, state: ComponentState) => void;
  resetNodeConfig: (id: string) => void;
  updateNodeMeta: (
    id: string,
    updates: Partial<Pick<PageNode, 'name' | 'colSpan' | 'align'>>
  ) => void;
  moveNode: (id: string, direction: 'up' | 'down') => void;
  reorderNodes: (fromIndex: number, toIndex: number) => void;
  duplicateNode: (id: string) => string | null;
  removeNode: (id: string) => void;
  clearCanvas: () => void;
  updatePageSettings: (updates: Partial<PageSettings>) => void;
  resetPageSettings: () => void;
}

export const usePageStore = create<PageState>()(
  persist(
    (set, get) => ({
      pageSettings: { ...defaultPageSettings },
      nodes: [],
      selectedNodeId: null,

      addNode: (componentType, category, overrides, customName) => {
        const id = generateNodeId();
        const existingNames = get().nodes.map((n) => n.name);
        const uniqueName = createUniqueNodeName(customName || componentType, existingNames);
        const node: PageNode = {
          id,
          name: uniqueName,
          componentType,
          category: category ?? getCategoryForComponent(componentType),
          config: buildComponentConfig(componentType, overrides),
          activeState: 'default',
          colSpan: 1,
          align: 'stretch',
        };
        set((state) => ({
          nodes: [...state.nodes, node],
          selectedNodeId: id,
        }));
        return id;
      },

      importTemplate: (template) => {
        return get().addNode(
          template.componentType,
          template.componentCategory,
          template.config,
          template.name
        );
      },

      selectNode: (id) => set({ selectedNodeId: id }),

      updateNodeConfig: (id, updates) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? { ...node, config: { ...node.config, ...updates } }
              : node
          ),
        })),

      updateNodeStateStyles: (id, stateName, updates) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? {
                  ...node,
                  config: {
                    ...node.config,
                    stateStyles: {
                      ...node.config.stateStyles,
                      [stateName]: {
                        ...node.config.stateStyles[stateName],
                        ...updates,
                      },
                    },
                  },
                }
              : node
          ),
        })),

      setNodeActiveState: (id, activeState) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id ? { ...node, activeState } : node
          ),
        })),

      resetNodeConfig: (id) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? {
                  ...node,
                  config: buildComponentConfig(node.componentType),
                  activeState: 'default',
                }
              : node
          ),
        })),

      updateNodeMeta: (id, updates) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id ? { ...node, ...updates } : node
          ),
        })),

      moveNode: (id, direction) =>
        set((state) => {
          const idx = state.nodes.findIndex((n) => n.id === id);
          if (idx === -1) return state;
          const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
          if (targetIdx < 0 || targetIdx >= state.nodes.length) return state;
          const next = [...state.nodes];
          const [item] = next.splice(idx, 1);
          next.splice(targetIdx, 0, item);
          return { nodes: next };
        }),

      reorderNodes: (fromIndex, toIndex) =>
        set((state) => {
          if (
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= state.nodes.length ||
            toIndex >= state.nodes.length ||
            fromIndex === toIndex
          ) {
            return state;
          }
          const next = [...state.nodes];
          const [moved] = next.splice(fromIndex, 1);
          next.splice(toIndex, 0, moved);
          return { nodes: next };
        }),

      duplicateNode: (id) => {
        const source = get().nodes.find((n) => n.id === id);
        if (!source) return null;
        const existingNames = get().nodes.map((n) => n.name);
        const newId = generateNodeId();
        const duplicate: PageNode = {
          ...source,
          id: newId,
          name: createUniqueNodeName(source.name, existingNames),
          config: buildComponentConfig(source.componentType, source.config),
        };
        const sourceIndex = get().nodes.findIndex((n) => n.id === id);
        set((state) => {
          const next = [...state.nodes];
          next.splice(sourceIndex + 1, 0, duplicate);
          return {
            nodes: next,
            selectedNodeId: newId,
          };
        });
        return newId;
      },

      removeNode: (id) =>
        set((state) => {
          const next = state.nodes.filter((n) => n.id !== id);
          const nextSelected =
            state.selectedNodeId === id ? (next[0]?.id ?? null) : state.selectedNodeId;
          return {
            nodes: next,
            selectedNodeId: nextSelected,
          };
        }),

      clearCanvas: () => set({ nodes: [], selectedNodeId: null }),

      updatePageSettings: (updates) =>
        set((state) => ({
          pageSettings: { ...state.pageSettings, ...updates },
        })),

      resetPageSettings: () => set({ pageSettings: { ...defaultPageSettings } }),
    }),
    {
      name: 'multi-style-page-maker-storage',
    }
  )
);
