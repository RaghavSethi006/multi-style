import { describe, it, expect } from 'vitest';
import {
  generateComponentCode,
  getSuggestedFileName,
  escapeJsString,
  escapeJsxText,
  escapeHtml,
  escapePythonString,
  toPascalCase,
  toKebabCase,
} from '@/utils/codeTemplates';
import { defaultComponentConfig, type Framework } from '@/store/useCustomizationStore';

describe('codeTemplates escaping and naming utilities', () => {
  it('escapes JS strings safely', () => {
    expect(escapeJsString("Hello 'World'\\n\nTest")).toBe("Hello \\'World\\'\\\\n\\nTest");
  });

  it('escapes JSX text safely', () => {
    expect(escapeJsxText('<script>{alert("x")}</script> & more')).toBe(
      '&lt;script&gt;&#123;alert("x")&#125;&lt;/script&gt; &amp; more'
    );
  });

  it('escapes HTML attributes and text safely', () => {
    expect(escapeHtml(`<div title="a'b">&</div>`)).toBe(
      '&lt;div title=&quot;a&#39;b&quot;&gt;&amp;&lt;/div&gt;'
    );
  });

  it('escapes Python strings safely', () => {
    expect(escapePythonString('Say "hi"\\now\nnext')).toBe('Say \\"hi\\"\\\\now\\nnext');
  });

  it('converts component names to PascalCase and kebab-case', () => {
    expect(toPascalCase('Standard Button')).toBe('StandardButton');
    expect(toPascalCase('Drag & Drop')).toBe('DragDrop');
    expect(toKebabCase('Progress Bar')).toBe('progress-bar');
  });
});

describe('generateComponentCode multi-framework parity', () => {
  const frameworks: Framework[] = ['react', 'angular', 'streamlit', 'tkinter', 'winui3'];
  const components = [
    'Standard Button',
    'Heading',
    'Text Field',
    'Checkbox',
    'Alert',
    'Table',
    'Modal',
    'Progress Bar',
  ];

  it('generates component-specific output across all 5 frameworks without throwing', () => {
    for (const componentName of components) {
      for (const framework of frameworks) {
        const output = generateComponentCode(framework, defaultComponentConfig, componentName);
        expect(output.length).toBeGreaterThan(20);
      }
    }
  });

  it('differentiates output by component type in React and Angular', () => {
    const reactHeading = generateComponentCode('react', {
      ...defaultComponentConfig,
      headingLevel: 2,
      text: 'Section Header',
    }, 'Heading');
    expect(reactHeading).toContain('<h2');
    expect(reactHeading).toContain('Section Header');
    expect(reactHeading).not.toContain('<button');

    const reactCheckbox = generateComponentCode('react', {
      ...defaultComponentConfig,
      label: 'Accept Terms',
      checkboxChecked: true,
    }, 'Checkbox');
    expect(reactCheckbox).toContain('type="checkbox"');
    expect(reactCheckbox).toContain('Accept Terms');

    const angularTextField = generateComponentCode('angular', {
      ...defaultComponentConfig,
      label: 'Email',
      placeholder: 'you@example.com',
    }, 'Text Field');
    expect(angularTextField).toContain('<input');
    expect(angularTextField).toContain('you@example.com');
  });

  it('safely escapes special characters in generated code across frameworks', () => {
    const trickyConfig = {
      ...defaultComponentConfig,
      text: `Click "Now" <tag> & {expr}`,
      label: `User's "Input"`,
    };

    const reactCode = generateComponentCode('react', trickyConfig, 'Standard Button');
    expect(reactCode).toContain('&lt;tag&gt;');
    expect(reactCode).toContain('&#123;expr&#125;');

    const pythonCode = generateComponentCode('streamlit', trickyConfig, 'Standard Button');
    expect(pythonCode).toContain('\\"Now\\"');

    const xamlCode = generateComponentCode('winui3', trickyConfig, 'Standard Button');
    expect(xamlCode).toContain('&lt;tag&gt;');
    expect(xamlCode).toContain('&quot;Now&quot;');
  });

  it('produces valid suggested filenames for each framework', () => {
    expect(getSuggestedFileName('Progress Bar', 'react')).toBe('ProgressBar.tsx');
    expect(getSuggestedFileName('Progress Bar', 'angular')).toBe('progress-bar.component.ts');
    expect(getSuggestedFileName('Progress Bar', 'streamlit')).toBe('progress_bar_streamlit.py');
    expect(getSuggestedFileName('Progress Bar', 'tkinter')).toBe('progress_bar_tk.py');
    expect(getSuggestedFileName('Progress Bar', 'winui3')).toBe('ProgressBar.xaml');
  });
});
