import { describe, it, expect, beforeEach } from 'vitest';
import { usePageStore } from '../usePageStore';
import type { SavedTemplate } from '../useTemplateStore';

describe('usePageStore', () => {
  beforeEach(() => {
    usePageStore.getState().clearCanvas();
    usePageStore.getState().resetPageSettings();
  });

  it('starts with a genuinely blank canvas', () => {
    const state = usePageStore.getState();
    expect(state.nodes).toEqual([]);
    expect(state.selectedNodeId).toBeNull();
  });

  it('adds components with unique names and independent configs', () => {
    const id1 = usePageStore.getState().addNode('Standard Button', 'Buttons');
    const id2 = usePageStore.getState().addNode('Standard Button', 'Buttons');

    const { nodes } = usePageStore.getState();
    expect(nodes).toHaveLength(2);
    expect(nodes[0].name).toBe('Standard Button');
    expect(nodes[1].name).toBe('Standard Button 2');

    // Updating node 1 does not mutate node 2
    usePageStore.getState().updateNodeConfig(id1, { text: 'Primary CTA', backgroundColor: '#111111' });
    const updated = usePageStore.getState().nodes;
    expect(updated.find((n) => n.id === id1)?.config.text).toBe('Primary CTA');
    expect(updated.find((n) => n.id === id2)?.config.text).toBe('Click Me');
  });

  it('imports a saved template with its custom overrides', () => {
    const template: SavedTemplate = {
      id: 'tpl-1',
      name: 'Hero Banner Title',
      description: 'Large display heading',
      componentType: 'Heading',
      componentCategory: 'Text & Typography',
      config: { text: 'Welcome Aboard', fontSize: 48 },
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    };

    const id = usePageStore.getState().importTemplate(template);
    const node = usePageStore.getState().nodes.find((n) => n.id === id);

    expect(node).toBeDefined();
    expect(node?.name).toBe('Hero Banner Title');
    expect(node?.config.text).toBe('Welcome Aboard');
    expect(node?.config.fontSize).toBe(48);
  });

  it('supports moving, duplicating, and removing nodes', () => {
    const id1 = usePageStore.getState().addNode('Heading');
    const id2 = usePageStore.getState().addNode('Standard Button');

    usePageStore.getState().moveNode(id2, 'up');
    expect(usePageStore.getState().nodes.map((n) => n.id)).toEqual([id2, id1]);

    const dupId = usePageStore.getState().duplicateNode(id2);
    expect(dupId).toBeTruthy();
    expect(usePageStore.getState().nodes).toHaveLength(3);

    usePageStore.getState().removeNode(id2);
    expect(usePageStore.getState().nodes).toHaveLength(2);
  });
});
