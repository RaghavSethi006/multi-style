import { describe, it, expect, beforeEach } from 'vitest';
import {
  useCustomizationStore,
  getCategoryForComponent,
  defaultComponentConfig,
} from '@/store/useCustomizationStore';
import { useTemplateStore } from '@/store/useTemplateStore';

describe('useCustomizationStore', () => {
  beforeEach(() => {
    useCustomizationStore.setState({
      selectedCategory: 'Buttons',
      selectedComponent: 'Standard Button',
      selectedFramework: 'react',
      activeState: 'default',
      componentConfig: { ...defaultComponentConfig },
    });
  });

  it('resolves categories accurately and sets component + category atomically', () => {
    expect(getCategoryForComponent('Heading')).toBe('Text & Typography');
    expect(getCategoryForComponent('NonExistent')).toBe('Buttons');

    useCustomizationStore.getState().selectComponentWithCategory('Table');
    const state = useCustomizationStore.getState();
    expect(state.selectedComponent).toBe('Table');
    expect(state.selectedCategory).toBe('Data Display');
    expect(state.activeState).toBe('default');
  });

  it('loads template configuration atomically without clobbering stateStyles', () => {
    useCustomizationStore.getState().loadTemplate('Heading', 'Text & Typography', {
      text: 'Custom Title',
      fontSize: 42,
      stateStyles: {
        ...defaultComponentConfig.stateStyles,
        hover: { ...defaultComponentConfig.stateStyles.hover, backgroundColor: '#112233' },
      },
    });

    const state = useCustomizationStore.getState();
    expect(state.selectedComponent).toBe('Heading');
    expect(state.selectedCategory).toBe('Text & Typography');
    expect(state.componentConfig.text).toBe('Custom Title');
    expect(state.componentConfig.fontSize).toBe(42);
    expect(state.componentConfig.stateStyles.hover.backgroundColor).toBe('#112233');
  });

  it('resets component config back to defaults for selected component', () => {
    useCustomizationStore.getState().updateComponentConfig({ fontSize: 99, text: 'Changed' });
    useCustomizationStore.getState().resetComponentConfig();

    const state = useCustomizationStore.getState();
    expect(state.componentConfig.fontSize).toBe(defaultComponentConfig.fontSize);
    expect(state.componentConfig.text).toBe(defaultComponentConfig.text);
  });
});

describe('useTemplateStore', () => {
  beforeEach(() => {
    useTemplateStore.setState({ templates: [], frameworks: [] });
  });

  it('saves, duplicates, exports, and imports valid frameworks', () => {
    const store = useTemplateStore.getState();
    const tplId = store.saveTemplate({
      name: 'Primary CTA',
      description: 'Rounded blue button',
      componentType: 'Standard Button',
      componentCategory: 'Buttons',
      config: { backgroundColor: '#2563EB', borderRadius: 12 },
    });

    const dupId = useTemplateStore.getState().duplicateTemplate(tplId);
    expect(dupId).toBeTruthy();
    expect(useTemplateStore.getState().templates).toHaveLength(2);
    expect(useTemplateStore.getState().getTemplateById(dupId)?.name).toBe('Primary CTA (Copy)');

    const fwId = useTemplateStore.getState().createFramework({
      name: 'Acme UI',
      description: 'Core buttons',
      version: '1.0.0',
      author: 'Design Team',
      templates: [tplId],
    });

    const exportedJson = useTemplateStore.getState().exportFramework(fwId);
    expect(exportedJson).toBeTruthy();

    useTemplateStore.setState({ templates: [], frameworks: [] });
    const importResult = useTemplateStore.getState().importFramework(exportedJson!);
    expect(importResult.success).toBe(true);
    expect(useTemplateStore.getState().frameworks).toHaveLength(1);
    expect(useTemplateStore.getState().templates).toHaveLength(1);
    expect(useTemplateStore.getState().templates[0].name).toBe('Primary CTA');
  });

  it('rejects malformed, oversized, and schema-invalid JSON imports', () => {
    const store = useTemplateStore.getState();

    expect(store.importFramework('{bad json').success).toBe(false);
    expect(store.importFramework('').success).toBe(false);
    expect(store.importFramework('{"framework":{"name":""},"templates":[]}').success).toBe(false);
    expect(store.importFramework('x'.repeat(2_000_005)).success).toBe(false);
  });

  it('strips prototype-pollution keys during importFramework', () => {
    const maliciousJson = JSON.stringify({
      framework: { name: 'Safe Kit', version: '1.0.0', author: 'Test' },
      templates: [
        {
          name: 'Btn',
          componentType: 'Standard Button',
          componentCategory: 'Buttons',
          config: JSON.parse('{"backgroundColor":"#111111","__proto__":{"polluted":true}}'),
        },
      ],
    });

    const result = useTemplateStore.getState().importFramework(maliciousJson);
    expect(result.success).toBe(true);
    const importedConfig = useTemplateStore.getState().templates[0].config as Record<string, unknown>;
    expect(Object.prototype.hasOwnProperty.call(importedConfig, '__proto__')).toBe(false);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});
