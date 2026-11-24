import type { ComponentConfig, Framework } from '@/store/useCustomizationStore';
import { computeBackground, computeBorderRadius, computeBoxShadow } from '@/lib/styleUtils';

// Safe escaping utilities so user-edited strings never break generated code
export function escapeJsString(value: string): string {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, '\\n');
}

export function escapeJsxText(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

export function escapeHtml(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapePythonString(value: string): string {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, '\\n');
}

export function toPascalCase(name: string): string {
  const cleaned = name
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  return cleaned || 'CustomComponent';
}

export function toKebabCase(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'component'
  );
}

function toHexColor(color: string, fallback = '#3B82F6'): string {
  if (!color) return fallback;
  const trimmed = color.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed.toUpperCase();
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`.toUpperCase();
  }
  return fallback;
}

function getEffectiveBackground(config: ComponentConfig): string {
  if (config.glassmorphism) {
    return `rgba(255, 255, 255, ${config.glassOpacity})`;
  }
  return computeBackground(config);
}

function buildCommonCssLines(config: ComponentConfig, indent = '  '): string[] {
  const lines = [
    `${indent}font-family: '${escapeJsString(config.fontFamily)}', sans-serif;`,
    `${indent}font-size: ${config.fontSize}px;`,
    `${indent}font-weight: ${config.fontWeight};`,
    `${indent}font-style: ${config.fontStyle};`,
    `${indent}line-height: ${config.lineHeight};`,
    `${indent}letter-spacing: ${config.letterSpacing}px;`,
    `${indent}color: ${config.textColor};`,
    `${indent}background: ${getEffectiveBackground(config)};`,
    `${indent}border: ${config.borderWidth}px ${config.borderStyle} ${config.borderColor};`,
    `${indent}border-radius: ${computeBorderRadius(config)};`,
    `${indent}padding: ${config.paddingTop}px ${config.paddingRight}px ${config.paddingBottom}px ${config.paddingLeft}px;`,
    `${indent}margin: ${config.marginTop}px ${config.marginRight}px ${config.marginBottom}px ${config.marginLeft}px;`,
    `${indent}box-shadow: ${computeBoxShadow(config)};`,
    `${indent}opacity: ${config.opacity};`,
    `${indent}transition: all ${config.transitionDuration}ms ${config.transitionEasing};`,
  ];
  if (config.glassmorphism) {
    lines.push(`${indent}backdrop-filter: blur(${config.glassBlur}px);`);
  }
  return lines;
}

function buildReactStyleObject(config: ComponentConfig, extra: Record<string, string | number> = {}): string {
  const entries: [string, string | number][] = [
    ['fontFamily', config.fontFamily],
    ['fontSize', `${config.fontSize}px`],
    ['fontWeight', config.fontWeight],
    ['fontStyle', config.fontStyle],
    ['lineHeight', config.lineHeight],
    ['letterSpacing', `${config.letterSpacing}px`],
    ['textAlign', config.textAlign],
    ['background', getEffectiveBackground(config)],
    ['color', config.textColor],
    ['border', `${config.borderWidth}px ${config.borderStyle} ${config.borderColor}`],
    ['borderRadius', computeBorderRadius(config)],
    ['padding', `${config.paddingTop}px ${config.paddingRight}px ${config.paddingBottom}px ${config.paddingLeft}px`],
    ['margin', `${config.marginTop}px ${config.marginRight}px ${config.marginBottom}px ${config.marginLeft}px`],
    ['boxShadow', computeBoxShadow(config)],
    ['opacity', config.opacity],
    ['transition', `all ${config.transitionDuration}ms ${config.transitionEasing}`],
  ];

  if (config.glassmorphism) {
    entries.push(['backdropFilter', `blur(${config.glassBlur}px)`]);
  }
  for (const [k, v] of Object.entries(extra)) {
    const idx = entries.findIndex(([key]) => key === k);
    if (idx >= 0) entries[idx][1] = v;
    else entries.push([k, v]);
  }

  return `{\n${entries
    .map(([k, v]) => `      ${k}: ${typeof v === 'number' ? v : `'${escapeJsString(v)}'`},`)
    .join('\n')}\n    }`;
}

export const generateReactCode = (
  config: ComponentConfig,
  componentName = 'Standard Button'
): string => {
  const compPascal = `Custom${toPascalCase(componentName)}`;
  const iconName = config.buttonIcon || (componentName === 'Icon Button' ? 'Settings' : componentName === 'FAB Button' ? 'Plus' : '');

  switch (componentName) {
    case 'Standard Button':
    case 'Outline Button': {
      const iconImport = iconName ? `import { ${iconName} } from 'lucide-react';\n\n` : '';
      const styleObj = buildReactStyleObject(config, {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: `${config.gap}px`,
        width: config.buttonFullWidth ? '100%' : config.width,
        height: config.height,
        cursor: config.buttonLoading ? 'wait' : 'pointer',
      });
      return `${iconImport}export function ${compPascal}() {
  return (
    <button
      type="button"
      disabled={${config.buttonLoading}}
      style={${styleObj}}
    >
      ${iconName && config.buttonIconPosition === 'left' ? `<${iconName} size={${config.fontSize}} />` : ''}
      <span>${escapeJsxText(config.text)}</span>
      ${iconName && config.buttonIconPosition === 'right' ? `<${iconName} size={${config.fontSize}} />` : ''}
    </button>
  );
}`;
    }

    case 'Icon Button': {
      const icon = config.buttonIcon || 'Settings';
      const styleObj = buildReactStyleObject(config, {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: config.iconButtonShape === 'circle' ? '50%' : computeBorderRadius(config),
        cursor: 'pointer',
      });
      return `import { ${icon} } from 'lucide-react';

export function ${compPascal}() {
  return (
    <button
      type="button"
      aria-label="${escapeHtml(config.iconButtonTooltip || 'Action')}"
      title="${escapeHtml(config.iconButtonTooltip || 'Action')}"
      style={${styleObj}}
    >
      <${icon} size={${config.fontSize}} />
    </button>
  );
}`;
    }

    case 'FAB Button': {
      const icon = config.buttonIcon || 'Plus';
      const posMap: Record<string, Record<string, string>> = {
        'bottom-right': { bottom: '24px', right: '24px' },
        'bottom-left': { bottom: '24px', left: '24px' },
        'top-right': { top: '24px', right: '24px' },
        'top-left': { top: '24px', left: '24px' },
      };
      const pos = posMap[config.fabPosition] || posMap['bottom-right'];
      const styleObj = buildReactStyleObject(config, {
        position: 'fixed',
        ...pos,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: config.fabExtended ? '8px' : '0px',
        borderRadius: config.fabExtended ? `${config.borderRadius}px` : '50%',
        cursor: 'pointer',
        zIndex: 50,
      });
      return `import { ${icon} } from 'lucide-react';

export function ${compPascal}() {
  return (
    <button
      type="button"
      aria-label="${escapeHtml(config.text || 'Floating action')}"
      style={${styleObj}}
    >
      <${icon} size={${Math.round(config.fontSize * 1.25)}} />${config.fabExtended && config.text ? `\n      <span>${escapeJsxText(config.text)}</span>` : ''}
    </button>
  );
}`;
    }

    case 'Toggle Button': {
      const styleObj = buildReactStyleObject(config, {
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${config.gap}px`,
        cursor: 'pointer',
      });
      return `import { useState } from 'react';
import { Check } from 'lucide-react';

export function ${compPascal}() {
  const [selected, setSelected] = useState(${config.toggleSelected});

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => setSelected((prev) => !prev)}
      style={{
        ...${styleObj},
        background: selected ? '#3B82F6' : '${escapeJsString(config.backgroundColor)}',
        color: selected ? '#FFFFFF' : '${escapeJsString(config.textColor)}',
      }}
    >
      {selected && <Check size={${config.fontSize}} />}
      <span>{selected ? '${escapeJsString(config.toggleOnLabel)}' : '${escapeJsString(config.toggleOffLabel)}'}</span>
    </button>
  );
}`;
    }

    case 'Heading': {
      const tag = `h${config.headingLevel}`;
      const styleObj = buildReactStyleObject(config);
      return `export function ${compPascal}() {
  return (
    <${tag} style={${styleObj}}>
      ${escapeJsxText(config.text)}
    </${tag}>
  );
}`;
    }

    case 'Paragraph': {
      const styleObj = buildReactStyleObject(config, { maxWidth: '600px' });
      return `export function ${compPascal}() {
  return (
    <p style={${styleObj}}>
      ${escapeJsxText(config.text)}
    </p>
  );
}`;
    }

    case 'Label': {
      const styleObj = buildReactStyleObject(config, { display: 'inline-block' });
      return `export function ${compPascal}() {
  return (
    <label style={${styleObj}}>
      ${escapeJsxText(config.text)}${config.inputRequired ? `<span style={{ color: '#EF4444', marginLeft: '4px' }}>*</span>` : ''}
    </label>
  );
}`;
    }

    case 'Blockquote': {
      const styleObj = buildReactStyleObject(config, {
        borderLeft: `${config.borderWidth}px solid ${config.borderColor}`,
        maxWidth: '600px',
      });
      return `export function ${compPascal}() {
  return (
    <blockquote style={${styleObj}}>
      <p style={{ margin: 0 }}>"${escapeJsxText(config.text)}"</p>${config.blockquoteAuthor ? `\n      <footer style={{ marginTop: '12px', opacity: 0.75, fontStyle: 'normal' }}>— ${escapeJsxText(config.blockquoteAuthor)}</footer>` : ''}
    </blockquote>
  );
}`;
    }

    case 'Code Block':
    case 'Code Editor': {
      const styleObj = buildReactStyleObject(config, {
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        maxWidth: '600px',
        overflow: 'auto',
      });
      return `export function ${compPascal}() {
  const code = '${escapeJsString(config.codeContent)}';
  return (
    <pre data-language="${escapeHtml(config.codeLanguage)}" style={${styleObj}}>
      <code>{code}</code>
    </pre>
  );
}`;
    }

    case 'Text Field':
    case 'Password Input':
    case 'Search Field':
    case 'Number Input': {
      const inputType =
        componentName === 'Password Input'
          ? 'password'
          : componentName === 'Search Field'
            ? 'search'
            : componentName === 'Number Input'
              ? 'number'
              : config.inputType;
      const borderColor =
        config.inputValidationState === 'error'
          ? '#EF4444'
          : config.inputValidationState === 'success'
            ? '#22C55E'
            : config.borderColor;
      const styleObj = buildReactStyleObject(config, {
        borderColor,
        width: config.width === 'auto' ? '280px' : config.width,
        outline: 'none',
      });
      return `import { useState } from 'react';

export function ${compPascal}() {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '${config.width === 'auto' ? '280px' : escapeJsString(config.width)}' }}>
      ${config.label ? `<label style={{ fontSize: '${Math.round(config.fontSize * 0.875)}px', fontWeight: 500 }}>
        ${escapeJsxText(config.label)}${config.inputRequired ? ' *' : ''}
      </label>` : ''}
      <input
        type="${inputType}"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="${escapeHtml(config.placeholder)}"
        required={${config.inputRequired}}
        style={${styleObj}}
      />
      ${config.inputHelperText ? `<span style={{ fontSize: '12px', color: '${config.inputValidationState === 'error' ? '#EF4444' : config.inputValidationState === 'success' ? '#22C55E' : '#6B7280'}' }}>${escapeJsxText(config.inputHelperText)}</span>` : ''}
    </div>
  );
}`;
    }

    case 'Text Area': {
      const styleObj = buildReactStyleObject(config, {
        width: config.width === 'auto' ? '320px' : config.width,
        resize: config.textareaResize,
      });
      return `import { useState } from 'react';

export function ${compPascal}() {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      ${config.label ? `<label style={{ fontSize: '${Math.round(config.fontSize * 0.875)}px', fontWeight: 500 }}>${escapeJsxText(config.label)}</label>` : ''}
      <textarea
        rows={${config.textareaRows}}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="${escapeHtml(config.placeholder)}"
        required={${config.inputRequired}}
        style={${styleObj}}
      />
    </div>
  );
}`;
    }

    case 'Range Slider': {
      return `import { useState } from 'react';

export function ${compPascal}() {
  const [value, setValue] = useState(${config.sliderValue});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '280px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '${Math.round(config.fontSize * 0.875)}px' }}>
        <span>${escapeJsxText(config.label)}</span>
        ${config.sliderShowValue ? `<strong>{value}</strong>` : ''}
      </div>
      <input
        type="range"
        min={${config.sliderMin}}
        max={${config.sliderMax}}
        step={${config.sliderStep}}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
}`;
    }

    case 'File Upload': {
      const styleObj = buildReactStyleObject(config, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
      });
      return `export function ${compPascal}() {
  return (
    <label style={${styleObj}}>
      <input type="file" accept="${escapeHtml(config.fileAccept)}" multiple={${config.fileMultiple}} hidden />
      <span>${config.fileDragDrop ? 'Drag and drop or click to upload' : 'Click to upload'}</span>
    </label>
  );
}`;
    }

    case 'Color Picker': {
      return `import { useState } from 'react';

export function ${compPascal}() {
  const [color, setColor] = useState('${toHexColor(config.backgroundColor)}');

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <span>${escapeJsxText(config.label)}</span>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <code>{color}</code>
    </label>
  );
}`;
    }

    case 'Checkbox': {
      return `import { useState } from 'react';

export function ${compPascal}() {
  const [checked, setChecked] = useState(${config.checkboxChecked});

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '${config.fontSize}px', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        style={{ width: '18px', height: '18px', borderRadius: '${config.borderRadius}px' }}
      />
      <span>${escapeJsxText(config.label)}</span>
    </label>
  );
}`;
    }

    case 'Radio Group': {
      const opts = JSON.stringify(config.radioOptions);
      return `import { useState } from 'react';

export function ${compPascal}() {
  const options = ${opts};
  const [selected, setSelected] = useState(${config.radioSelectedIndex});

  return (
    <fieldset style={{ border: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <legend style={{ fontWeight: 500, marginBottom: '6px' }}>${escapeJsxText(config.label)}</legend>
      {options.map((option, index) => (
        <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="radio" name="radio-group" checked={selected === index} onChange={() => setSelected(index)} />
          <span>{option}</span>
        </label>
      ))}
    </fieldset>
  );
}`;
    }

    case 'Switch': {
      return `import { useState } from 'react';

export function ${compPascal}() {
  const [enabled, setEnabled] = useState(${config.switchChecked});

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', flexDirection: '${config.switchLabelPosition === 'left' ? 'row-reverse' : 'row'}', cursor: 'pointer' }}>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled((v) => !v)}
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '9999px',
          border: 'none',
          background: enabled ? '#3B82F6' : '#D1D5DB',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <span style={{
          position: 'absolute',
          top: '2px',
          left: enabled ? '22px' : '2px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#FFFFFF',
          transition: 'left 150ms ease',
        }} />
      </button>
      <span>${escapeJsxText(config.label)}</span>
    </label>
  );
}`;
    }

    case 'Dropdown':
    case 'Autocomplete': {
      const opts = JSON.stringify(config.dropdownOptions);
      const styleObj = buildReactStyleObject(config, { width: '280px' });
      return `import { useState } from 'react';

export function ${compPascal}() {
  const options = ${opts};
  const [value, setValue] = useState('${config.dropdownSelectedIndex >= 0 ? escapeJsString(config.dropdownOptions[config.dropdownSelectedIndex] || '') : ''}');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '280px' }}>
      <label style={{ fontSize: '${Math.round(config.fontSize * 0.875)}px', fontWeight: 500 }}>${escapeJsxText(config.label)}</label>
      <select value={value} onChange={(e) => setValue(e.target.value)} style={${styleObj}}>
        <option value="">${escapeJsxText(config.dropdownPlaceholder)}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}`;
    }

    case 'Nav Bar': {
      const items = JSON.stringify(config.navbarItems);
      const styleObj = buildReactStyleObject(config, {
        display: 'flex',
        flexDirection: config.navbarOrientation === 'horizontal' ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: config.navbarOrientation === 'horizontal' ? 'center' : 'stretch',
      });
      return `import { useState } from 'react';

export function ${compPascal}() {
  const items = ${items};
  const [active, setActive] = useState(${config.navbarActiveIndex});

  return (
    <nav style={${styleObj}}>
      <strong>Brand</strong>
      <div style={{ display: 'flex', flexDirection: '${config.navbarOrientation === 'horizontal' ? 'row' : 'column'}', gap: '8px' }}>
        {items.map((item, idx) => (
          <button
            key={item}
            type="button"
            onClick={() => setActive(idx)}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: 'none',
              background: active === idx ? '#EFF6FF' : 'transparent',
              color: active === idx ? '#3B82F6' : 'inherit',
              cursor: 'pointer',
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}`;
    }

    case 'Tabs': {
      const items = JSON.stringify(config.tabItems);
      return `import { useState } from 'react';

export function ${compPascal}() {
  const tabs = ${items};
  const [active, setActive] = useState(${config.tabActiveIndex});

  return (
    <div role="tablist" style={{ display: 'inline-flex', gap: '4px', borderBottom: '${config.tabVariant === 'underline' ? '1px solid #E5E7EB' : 'none'}' }}>
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === idx}
          onClick={() => setActive(idx)}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderRadius: '${config.tabVariant === 'pills' ? '9999px' : '6px'}',
            background: active === idx ? '#3B82F6' : 'transparent',
            color: active === idx ? '#FFFFFF' : '#6B7280',
            cursor: 'pointer',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}`;
    }

    case 'Breadcrumbs': {
      const items = JSON.stringify(config.breadcrumbItems);
      const sep = config.breadcrumbSeparator === 'arrow' ? '→' : config.breadcrumbSeparator === 'slash' ? '/' : '›';
      return `export function ${compPascal}() {
  const items = ${items};

  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '${config.fontSize}px' }}>
      {items.map((item, idx) => (
        <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: idx === items.length - 1 ? 600 : 400 }}>{item}</span>
          {idx < items.length - 1 && <span aria-hidden="true">${sep}</span>}
        </span>
      ))}
    </nav>
  );
}`;
    }

    case 'Pagination': {
      const totalPages = Math.max(1, Math.ceil(config.paginationTotal / config.paginationPageSize));
      return `import { useState } from 'react';

export function ${compPascal}() {
  const [page, setPage] = useState(${config.paginationCurrent});
  const totalPages = ${totalPages};

  return (
    <nav aria-label="Pagination" style={{ display: 'flex', gap: '6px' }}>
      <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => setPage(num)}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid ${escapeJsString(config.borderColor)}',
            background: page === num ? '#3B82F6' : '#FFFFFF',
            color: page === num ? '#FFFFFF' : '#374151',
          }}
        >
          {num}
        </button>
      ))}
      <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
    </nav>
  );
}`;
    }

    case 'Stepper': {
      const steps = JSON.stringify(config.stepperSteps);
      return `export function ${compPascal}() {
  const steps = ${steps};
  const currentStep = ${config.stepperCurrentStep};

  return (
    <div style={{ display: 'flex', flexDirection: '${config.stepperOrientation === 'horizontal' ? 'row' : 'column'}', gap: '16px' }}>
      {steps.map((step, idx) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: idx <= currentStep ? '#3B82F6' : '#E5E7EB',
            color: idx <= currentStep ? '#FFFFFF' : '#6B7280',
          }}>
            {idx + 1}
          </span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}`;
    }

    case 'Basic Card':
    case 'Image Card':
    case 'Profile Card': {
      const styleObj = buildReactStyleObject(config, { width: '320px', overflow: 'hidden' });
      if (componentName === 'Profile Card') {
        return `export function ${compPascal}() {
  return (
    <div style={${styleObj}}>
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h3 style={{ margin: 0 }}>${escapeJsxText(config.profileName)}</h3>
        <p style={{ margin: '4px 0 0', opacity: 0.7 }}>${escapeJsxText(config.profileRole)}</p>
      </div>
    </div>
  );
}`;
      }
      return `export function ${compPascal}() {
  return (
    <div style={${styleObj}}>
      ${componentName === 'Image Card' ? `<img src="${escapeHtml(config.cardImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400')}" alt="${escapeHtml(config.cardTitle)}" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />` : ''}
      ${config.cardShowHeader ? `<div style={{ padding: '16px 20px', borderBottom: '1px solid ${escapeJsString(config.borderColor)}' }}>
        <h3 style={{ margin: 0 }}>${escapeJsxText(config.cardTitle)}</h3>
        <p style={{ margin: '4px 0 0', opacity: 0.7 }}>${escapeJsxText(config.cardSubtitle)}</p>
      </div>` : ''}
      <div style={{ padding: '20px' }}>${escapeJsxText(config.text)}</div>
      ${config.cardShowFooter ? `<div style={{ padding: '16px 20px', borderTop: '1px solid ${escapeJsString(config.borderColor)}', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button type="button">Cancel</button>
        <button type="button">Confirm</button>
      </div>` : ''}
    </div>
  );
}`;
    }

    case 'Accordion': {
      const items = JSON.stringify(config.accordionItems);
      const styleObj = buildReactStyleObject(config, { width: '400px', overflow: 'hidden' });
      return `import { useState } from 'react';

export function ${compPascal}() {
  const items = ${items};
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={${styleObj}}>
      {items.map((item, idx) => (
        <div key={item.title} style={{ borderBottom: '1px solid ${escapeJsString(config.borderColor)}' }}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            style={{ width: '100%', padding: '14px 16px', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {item.title}
          </button>
          {openIndex === idx && <div style={{ padding: '0 16px 14px' }}>{item.content}</div>}
        </div>
      ))}
    </div>
  );
}`;
    }

    case 'Alert':
    case 'Toast': {
      const styleObj = buildReactStyleObject(config, {
        borderLeft: '4px solid #3B82F6',
        borderRadius: `${config.borderRadius}px`,
        padding: '16px',
      });
      return `export function ${compPascal}() {
  return (
    <div role="alert" data-type="${config.alertType}" style={${styleObj}}>
      <strong>${escapeJsxText(componentName === 'Alert' ? config.alertTitle : config.alertType.toUpperCase())}</strong>
      <p style={{ margin: '4px 0 0' }}>${escapeJsxText(componentName === 'Alert' ? config.alertMessage : config.text)}</p>
    </div>
  );
}`;
    }

    case 'Badge': {
      const styleObj = buildReactStyleObject(config, { display: 'inline-flex', alignItems: 'center' });
      return `export function ${compPascal}() {
  return (
    <span style={${styleObj}}>
      ${escapeJsxText(config.badgeContent)}
    </span>
  );
}`;
    }

    case 'Progress Bar': {
      return `export function ${compPascal}() {
  const value = ${config.progressValue};
  return (
    <div style={{ width: '300px' }}>
      ${config.progressShowLabel ? `<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span>Progress</span>
        <strong>{value}%</strong>
      </div>` : ''}
      <div style={{ width: '100%', height: '${config.progressSize === 'sm' ? '6px' : config.progressSize === 'lg' ? '16px' : '10px'}', background: '${escapeJsString(config.backgroundColor)}', borderRadius: '${config.borderRadius}px', overflow: 'hidden' }}>
        <div style={{ width: \`\${value}%\`, height: '100%', background: '#3B82F6' }} />
      </div>
    </div>
  );
}`;
    }

    case 'Modal': {
      const styleObj = buildReactStyleObject(config, { maxWidth: '480px', width: '100%' });
      return `import { useState } from 'react';

export function ${compPascal}() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open Modal</button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => ${config.modalCloseOnOverlay} && setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,${config.modalOverlayOpacity})', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div onClick={(e) => e.stopPropagation()} style={${styleObj}}>
            <h3>${escapeJsxText(config.modalTitle)}</h3>
            <p>${escapeJsxText(config.text)}</p>
            <button type="button" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}`;
    }

    case 'Tooltip': {
      return `export function ${compPascal}() {
  return (
    <span title="${escapeHtml(config.tooltipContent)}">
      <button type="button">${escapeJsxText(config.text)}</button>
    </span>
  );
}`;
    }

    case 'Skeleton': {
      return `export function ${compPascal}() {
  return (
    <div
      aria-busy="true"
      style={{
        width: '${config.skeletonVariant === 'circular' ? '48px' : '300px'}',
        height: '${config.skeletonVariant === 'circular' ? '48px' : config.skeletonVariant === 'text' ? '16px' : '120px'}',
        borderRadius: '${config.skeletonVariant === 'circular' ? '50%' : `${config.borderRadius}px`}',
        background: '${escapeJsString(config.backgroundColor)}',
      }}
    />
  );
}`;
    }

    case 'Simple List':
    case 'Icon List':
    case 'Checkbox List':
    case 'Ordered List': {
      const items = JSON.stringify(config.listItems);
      const tag = componentName === 'Ordered List' ? 'ol' : 'ul';
      return `export function ${compPascal}() {
  const items = ${items};
  return (
    <${tag} style={{ fontFamily: '${escapeJsString(config.fontFamily)}', fontSize: '${config.fontSize}px', color: '${escapeJsString(config.textColor)}', listStyleType: '${config.listStyleType}' }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </${tag}>
  );
}`;
    }

    case 'Table': {
      const cols = JSON.stringify(config.tableColumns);
      const rows = JSON.stringify(config.tableRows);
      return `export function ${compPascal}() {
  const columns = ${cols};
  const rows = ${rows};

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '${config.fontSize}px' }}>
      <thead>
        <tr>
          {columns.map((col) => <th key={col} style={{ textAlign: 'left', padding: '12px', borderBottom: '1px solid #E5E7EB' }}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {row.map((cell, cIdx) => <td key={cIdx} style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}`;
    }

    case 'Grid': {
      return `export function ${compPascal}() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(${config.gridColumns}, 1fr)', gap: '${config.gridGap}px' }}>
      {Array.from({ length: ${config.gridItems} }, (_, i) => (
        <div key={i} style={{ padding: '16px', background: '#EFF6FF', borderRadius: '8px', textAlign: 'center' }}>{i + 1}</div>
      ))}
    </div>
  );
}`;
    }

    case 'Timeline': {
      const items = JSON.stringify(config.timelineItems);
      return `export function ${compPascal}() {
  const items = ${items};
  return (
    <div style={{ display: 'flex', flexDirection: '${config.timelineOrientation === 'horizontal' ? 'row' : 'column'}', gap: '16px' }}>
      {items.map((item) => (
        <div key={item.title}>
          <small>{item.date}</small>
          <h4 style={{ margin: '4px 0' }}>{item.title}</h4>
          <p style={{ margin: 0 }}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}`;
    }

    case 'Carousel': {
      const slides = JSON.stringify(config.carouselItems);
      return `import { useState } from 'react';

export function ${compPascal}() {
  const slides = ${slides};
  const [index, setIndex] = useState(0);

  return (
    <div style={{ width: '400px', borderRadius: '${config.borderRadius}px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
      <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {slides[index]}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
        <button type="button" onClick={() => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1))}>Prev</button>
        <button type="button" onClick={() => setIndex((i) => (i + 1) % slides.length)}>Next</button>
      </div>
    </div>
  );
}`;
    }

    case 'Image': {
      return `export function ${compPascal}() {
  return (
    <img
      src="${escapeHtml(config.imageSrc)}"
      alt="${escapeHtml(config.imageAlt)}"
      loading="${config.imageLazyLoad ? 'lazy' : 'eager'}"
      style={{
        width: '${config.width === 'auto' ? '300px' : escapeJsString(config.width)}',
        height: '${config.height === 'auto' ? '200px' : escapeJsString(config.height)}',
        objectFit: '${config.imageObjectFit}',
        borderRadius: '${config.borderRadius}px',
        opacity: ${config.opacity},
      }}
    />
  );
}`;
    }

    case 'Avatar': {
      const sizeMap = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
      const px = sizeMap[config.avatarSize] || 40;
      return `export function ${compPascal}() {
  return (
    <div
      style={{
        width: '${px}px',
        height: '${px}px',
        borderRadius: '${config.avatarShape === 'circle' ? '50%' : '8px'}',
        background: '#EFF6FF',
        color: '#3B82F6',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
      }}
    >
      ${escapeJsxText(config.avatarFallback)}
    </div>
  );
}`;
    }

    case 'Icon': {
      const icon = config.iconName || 'Star';
      return `import { ${icon} } from 'lucide-react';

export function ${compPascal}() {
  return <${icon} size={${config.iconSize}} strokeWidth={${config.iconStrokeWidth}} color="${escapeHtml(config.textColor)}" />;
}`;
    }

    default: {
      const styleObj = buildReactStyleObject(config);
      return `export function ${compPascal}() {
  return (
    <div style={${styleObj}}>
      ${escapeJsxText(config.text || componentName)}
    </div>
  );
}`;
    }
  }
};

export const generateAngularCode = (
  config: ComponentConfig,
  componentName = 'Standard Button'
): string => {
  const kebab = toKebabCase(componentName);
  const pascal = `${toPascalCase(componentName)}Component`;
  const cssLines = buildCommonCssLines(config, '  ').join('\n');

  let templateHtml = `<button class="custom-component">${escapeHtml(config.text)}</button>`;
  if (componentName === 'Heading') {
    const tag = `h${config.headingLevel}`;
    templateHtml = `<${tag} class="custom-component">${escapeHtml(config.text)}</${tag}>`;
  } else if (componentName === 'Paragraph') {
    templateHtml = `<p class="custom-component">${escapeHtml(config.text)}</p>`;
  } else if (componentName === 'Label') {
    templateHtml = `<label class="custom-component">${escapeHtml(config.text)}</label>`;
  } else if (componentName === 'Blockquote') {
    templateHtml = `<blockquote class="custom-component">\n  <p>"${escapeHtml(config.text)}"</p>\n  ${config.blockquoteAuthor ? `<footer>— ${escapeHtml(config.blockquoteAuthor)}</footer>` : ''}\n</blockquote>`;
  } else if (componentName === 'Code Block' || componentName === 'Code Editor') {
    templateHtml = `<pre class="custom-component"><code>${escapeHtml(config.codeContent)}</code></pre>`;
  } else if (
    componentName === 'Text Field' ||
    componentName === 'Password Input' ||
    componentName === 'Search Field' ||
    componentName === 'Number Input'
  ) {
    templateHtml = `<div class="field-wrapper">\n  ${config.label ? `<label>${escapeHtml(config.label)}</label>\n  ` : ''}<input type="${config.inputType}" placeholder="${escapeHtml(config.placeholder)}" class="custom-component" />\n</div>`;
  } else if (componentName === 'Text Area') {
    templateHtml = `<textarea rows="${config.textareaRows}" placeholder="${escapeHtml(config.placeholder)}" class="custom-component"></textarea>`;
  } else if (componentName === 'Range Slider') {
    templateHtml = `<input type="range" min="${config.sliderMin}" max="${config.sliderMax}" step="${config.sliderStep}" [value]="${config.sliderValue}" />`;
  } else if (componentName === 'Checkbox') {
    templateHtml = `<label class="custom-component"><input type="checkbox" [checked]="${config.checkboxChecked}" /> ${escapeHtml(config.label)}</label>`;
  } else if (componentName === 'Switch') {
    templateHtml = `<label class="custom-component"><input type="checkbox" role="switch" [checked]="${config.switchChecked}" /> ${escapeHtml(config.label)}</label>`;
  } else if (componentName === 'Dropdown' || componentName === 'Autocomplete') {
    const options = config.dropdownOptions.map((o) => `  <option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join('\n');
    templateHtml = `<select class="custom-component">\n${options}\n</select>`;
  } else if (componentName === 'Basic Card' || componentName === 'Image Card' || componentName === 'Profile Card') {
    templateHtml = `<div class="custom-component">\n  <h3>${escapeHtml(componentName === 'Profile Card' ? config.profileName : config.cardTitle)}</h3>\n  <p>${escapeHtml(componentName === 'Profile Card' ? config.profileRole : config.text)}</p>\n</div>`;
  } else if (componentName === 'Alert' || componentName === 'Toast') {
    templateHtml = `<div role="alert" class="custom-component">\n  <strong>${escapeHtml(config.alertTitle)}</strong>\n  <p>${escapeHtml(componentName === 'Alert' ? config.alertMessage : config.text)}</p>\n</div>`;
  } else if (componentName === 'Badge') {
    templateHtml = `<span class="custom-component">${escapeHtml(config.badgeContent)}</span>`;
  } else if (componentName === 'Progress Bar') {
    templateHtml = `<progress class="custom-component" value="${config.progressValue}" max="100"></progress>`;
  } else if (componentName === 'Image') {
    templateHtml = `<img src="${escapeHtml(config.imageSrc)}" alt="${escapeHtml(config.imageAlt)}" class="custom-component" />`;
  }

  return `// ${kebab}.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-${kebab}',
  standalone: true,
  template: \`
${templateHtml
  .split('\n')
  .map((l) => `    ${l}`)
  .join('\n')}
  \`,
  styles: [\`
    .custom-component {
${cssLines}
    }
    .custom-component:hover {
      background: ${config.stateStyles.hover.backgroundColor || getEffectiveBackground(config)};
      color: ${config.stateStyles.hover.textColor || config.textColor};
    }
  \`]
})
export class ${pascal} {}`;
};

export const generateStreamlitCode = (
  config: ComponentConfig,
  componentName = 'Standard Button'
): string => {
  const cssLines = buildCommonCssLines(config, '    ').join('\n');

  let widgetCode = `if st.button("${escapePythonString(config.text)}", key="custom_component"):\n    st.write("Clicked!")`;

  if (componentName === 'Heading') {
    widgetCode = `st.markdown("${'#'.repeat(Math.min(6, Math.max(1, config.headingLevel)))} ${escapePythonString(config.text)}")`;
  } else if (componentName === 'Paragraph' || componentName === 'Label') {
    widgetCode = `st.write("${escapePythonString(config.text)}")`;
  } else if (componentName === 'Blockquote') {
    widgetCode = `st.markdown("> ${escapePythonString(config.text)}${config.blockquoteAuthor ? `\\n> — *${escapePythonString(config.blockquoteAuthor)}*` : ''}")`;
  } else if (componentName === 'Code Block' || componentName === 'Code Editor') {
    widgetCode = `st.code("${escapePythonString(config.codeContent)}", language="${escapePythonString(config.codeLanguage)}")`;
  } else if (componentName === 'Text Field' || componentName === 'Search Field') {
    widgetCode = `value = st.text_input("${escapePythonString(config.label || 'Input')}", placeholder="${escapePythonString(config.placeholder)}")`;
  } else if (componentName === 'Password Input') {
    widgetCode = `password = st.text_input("${escapePythonString(config.label || 'Password')}", type="password", placeholder="${escapePythonString(config.placeholder)}")`;
  } else if (componentName === 'Number Input') {
    widgetCode = `num = st.number_input("${escapePythonString(config.label || 'Quantity')}", value=0)`;
  } else if (componentName === 'Text Area') {
    widgetCode = `message = st.text_area("${escapePythonString(config.label || 'Message')}", placeholder="${escapePythonString(config.placeholder)}")`;
  } else if (componentName === 'File Upload') {
    widgetCode = `uploaded = st.file_uploader("${escapePythonString(config.label || 'Upload File')}", accept_multiple_files=${config.fileMultiple ? 'True' : 'False'})`;
  } else if (componentName === 'Color Picker') {
    widgetCode = `color = st.color_picker("${escapePythonString(config.label || 'Color')}", "${toHexColor(config.backgroundColor)}")`;
  } else if (componentName === 'Range Slider') {
    widgetCode = `val = st.slider("${escapePythonString(config.label || 'Value')}", min_value=${config.sliderMin}, max_value=${config.sliderMax}, value=${config.sliderValue}, step=${config.sliderStep})`;
  } else if (componentName === 'Checkbox') {
    widgetCode = `checked = st.checkbox("${escapePythonString(config.label)}", value=${config.checkboxChecked ? 'True' : 'False'})`;
  } else if (componentName === 'Radio Group') {
    const opts = config.radioOptions.map((o) => `"${escapePythonString(o)}"`).join(', ');
    widgetCode = `choice = st.radio("${escapePythonString(config.label)}", [${opts}], index=${config.radioSelectedIndex})`;
  } else if (componentName === 'Switch' || componentName === 'Toggle Button') {
    const active = componentName === 'Switch' ? config.switchChecked : config.toggleSelected;
    widgetCode = `enabled = st.toggle("${escapePythonString(config.label || config.toggleOnLabel)}", value=${active ? 'True' : 'False'})`;
  } else if (componentName === 'Dropdown' || componentName === 'Autocomplete') {
    const opts = config.dropdownOptions.map((o) => `"${escapePythonString(o)}"`).join(', ');
    widgetCode = `selected = st.selectbox("${escapePythonString(config.label)}", [${opts}])`;
  } else if (componentName === 'Tabs') {
    const tabs = config.tabItems.map((t) => `"${escapePythonString(t)}"`).join(', ');
    widgetCode = `tabs = st.tabs([${tabs}])\nwith tabs[0]:\n    st.write("Tab content")`;
  } else if (componentName === 'Alert') {
    const fn =
      config.alertType === 'success'
        ? 'success'
        : config.alertType === 'warning'
          ? 'warning'
          : config.alertType === 'error'
            ? 'error'
            : 'info';
    widgetCode = `st.${fn}("${escapePythonString(config.alertMessage)}")`;
  } else if (componentName === 'Toast') {
    widgetCode = `st.toast("${escapePythonString(config.text)}")`;
  } else if (componentName === 'Progress Bar') {
    widgetCode = `st.progress(${Math.round(config.progressValue)} / 100, text="Progress (${config.progressValue}%)")`;
  } else if (componentName === 'Table') {
    widgetCode = `import pandas as pd\ndf = pd.DataFrame(${JSON.stringify(config.tableRows)}, columns=${JSON.stringify(config.tableColumns)})\nst.dataframe(df, use_container_width=True)`;
  } else if (componentName === 'Image') {
    widgetCode = `st.image("${escapePythonString(config.imageSrc)}", caption="${escapePythonString(config.imageAlt)}")`;
  } else if (componentName === 'Accordion') {
    widgetCode = config.accordionItems
      .map(
        (item) =>
          `with st.expander("${escapePythonString(item.title)}"):\n    st.write("${escapePythonString(item.content)}")`
      )
      .join('\n');
  }

  return `import streamlit as st

# Styling override for ${componentName}
st.markdown("""
<style>
.stButton > button, .custom-component {
${cssLines}
}
</style>
""", unsafe_allow_html=True)

${widgetCode}`;
};

export const generateTkinterCode = (
  config: ComponentConfig,
  componentName = 'Standard Button'
): string => {
  const bg = toHexColor(config.backgroundColor, '#FFFFFF');
  const fg = toHexColor(config.textColor, '#111827');
  const fontSizePt = Math.max(8, Math.round(config.fontSize * 0.75));
  const className = `Custom${toPascalCase(componentName)}`;

  let body = `        self.widget = tk.Button(
            parent,
            text="${escapePythonString(config.text)}",
            font=("${escapePythonString(config.fontFamily)}", ${fontSizePt}),
            bg="${bg}",
            fg="${fg}",
            relief="flat",
            borderwidth=${config.borderWidth},
            padx=${config.paddingLeft},
            pady=${config.paddingTop},
            cursor="hand2"
        )`;

  if (componentName === 'Heading' || componentName === 'Paragraph' || componentName === 'Label') {
    body = `        self.widget = tk.Label(
            parent,
            text="${escapePythonString(config.text)}",
            font=("${escapePythonString(config.fontFamily)}", ${fontSizePt}),
            fg="${fg}",
            bg="${bg}"
        )`;
  } else if (componentName === 'Text Field' || componentName === 'Password Input' || componentName === 'Search Field') {
    const showArg = componentName === 'Password Input' ? ',\n            show="*"' : '';
    body = `        self.var = tk.StringVar()
        self.widget = tk.Entry(
            parent,
            textvariable=self.var,
            font=("${escapePythonString(config.fontFamily)}", ${fontSizePt}),
            bg="${bg}",
            fg="${fg}",
            borderwidth=${config.borderWidth}${showArg}
        )`;
  } else if (componentName === 'Text Area' || componentName === 'Code Block' || componentName === 'Code Editor') {
    body = `        self.widget = tk.Text(
            parent,
            height=${config.textareaRows},
            font=("${escapePythonString(config.fontFamily)}", ${fontSizePt}),
            bg="${bg}",
            fg="${fg}"
        )`;
  } else if (componentName === 'Checkbox' || componentName === 'Switch') {
    const initial = componentName === 'Checkbox' ? config.checkboxChecked : config.switchChecked;
    body = `        self.var = tk.BooleanVar(value=${initial ? 'True' : 'False'})
        self.widget = tk.Checkbutton(
            parent,
            text="${escapePythonString(config.label)}",
            variable=self.var,
            font=("${escapePythonString(config.fontFamily)}", ${fontSizePt})
        )`;
  } else if (componentName === 'Range Slider') {
    body = `        self.widget = tk.Scale(
            parent,
            from_=${config.sliderMin},
            to=${config.sliderMax},
            resolution=${config.sliderStep},
            orient="horizontal",
            label="${escapePythonString(config.label)}"
        )
        self.widget.set(${config.sliderValue})`;
  } else if (componentName === 'Dropdown' || componentName === 'Autocomplete') {
    const opts = config.dropdownOptions.map((o) => `"${escapePythonString(o)}"`).join(', ');
    body = `        self.var = tk.StringVar()
        self.widget = ttk.Combobox(
            parent,
            textvariable=self.var,
            values=[${opts}],
            state="readonly"
        )`;
  } else if (componentName === 'Progress Bar') {
    body = `        self.widget = ttk.Progressbar(
            parent,
            orient="horizontal",
            length=280,
            mode="determinate",
            value=${config.progressValue}
        )`;
  }

  return `import tkinter as tk
from tkinter import ttk

class ${className}:
    def __init__(self, parent):
${body}

if __name__ == "__main__":
    root = tk.Tk()
    root.title("${escapePythonString(componentName)}")
    comp = ${className}(root)
    comp.widget.pack(padx=20, pady=20)
    root.mainloop()`;
};

export const generateWinUI3Code = (
  config: ComponentConfig,
  componentName = 'Standard Button'
): string => {
  const fontWeight =
    config.fontWeight >= 700 ? 'Bold' : config.fontWeight >= 500 ? 'SemiBold' : 'Normal';
  const fontStyle = config.fontStyle === 'italic' ? 'Italic' : 'Normal';
  const bg = toHexColor(config.backgroundColor, '#3B82F6');
  const fg = toHexColor(config.textColor, '#FFFFFF');
  const border = toHexColor(config.borderColor, '#D1D5DB');
  const padding = `${config.paddingLeft},${config.paddingTop},${config.paddingRight},${config.paddingBottom}`;
  const margin = `${config.marginLeft},${config.marginTop},${config.marginRight},${config.marginBottom}`;

  switch (componentName) {
    case 'Heading':
    case 'Paragraph':
    case 'Label':
      return `<TextBlock
    Text="${escapeHtml(config.text)}"
    FontFamily="${escapeHtml(config.fontFamily)}"
    FontSize="${config.fontSize}"
    FontWeight="${fontWeight}"
    FontStyle="${fontStyle}"
    Foreground="${fg}"
    Margin="${margin}"
    TextWrapping="Wrap" />`;

    case 'Text Field':
    case 'Search Field':
    case 'Text Area':
      return `<TextBox
    Header="${escapeHtml(config.label)}"
    PlaceholderText="${escapeHtml(config.placeholder)}"
    FontFamily="${escapeHtml(config.fontFamily)}"
    FontSize="${config.fontSize}"
    Foreground="${fg}"
    Background="${bg}"
    BorderBrush="${border}"
    BorderThickness="${config.borderWidth}"
    CornerRadius="${config.borderRadius}"
    Padding="${padding}"
    AcceptsReturn="${componentName === 'Text Area' ? 'True' : 'False'}" />`;

    case 'Password Input':
      return `<PasswordBox
    Header="${escapeHtml(config.label)}"
    PlaceholderText="${escapeHtml(config.placeholder)}"
    CornerRadius="${config.borderRadius}" />`;

    case 'Checkbox':
      return `<CheckBox
    Content="${escapeHtml(config.label)}"
    IsChecked="${config.checkboxChecked ? 'True' : 'False'}"
    FontSize="${config.fontSize}" />`;

    case 'Switch':
      return `<ToggleSwitch
    Header="${escapeHtml(config.label)}"
    IsOn="${config.switchChecked ? 'True' : 'False'}" />`;

    case 'Range Slider':
      return `<Slider
    Header="${escapeHtml(config.label)}"
    Minimum="${config.sliderMin}"
    Maximum="${config.sliderMax}"
    StepFrequency="${config.sliderStep}"
    Value="${config.sliderValue}" />`;

    case 'Dropdown':
    case 'Autocomplete':
      return `<ComboBox
    Header="${escapeHtml(config.label)}"
    PlaceholderText="${escapeHtml(config.dropdownPlaceholder)}"
    CornerRadius="${config.borderRadius}">
${config.dropdownOptions.map((opt) => `    <x:String>${escapeHtml(opt)}</x:String>`).join('\n')}
</ComboBox>`;

    case 'Progress Bar':
      return `<ProgressBar
    Value="${config.progressValue}"
    Maximum="100"
    CornerRadius="${config.borderRadius}" />`;

    case 'Alert':
      return `<InfoBar
    IsOpen="True"
    Severity="${config.alertType === 'error' ? 'Error' : config.alertType === 'warning' ? 'Warning' : config.alertType === 'success' ? 'Success' : 'Informational'}"
    Title="${escapeHtml(config.alertTitle)}"
    Message="${escapeHtml(config.alertMessage)}" />`;

    default:
      return `<Button
    Content="${escapeHtml(config.text)}"
    FontFamily="${escapeHtml(config.fontFamily)}"
    FontSize="${config.fontSize}"
    FontWeight="${fontWeight}"
    FontStyle="${fontStyle}"
    Foreground="${fg}"
    Background="${bg}"
    BorderBrush="${border}"
    BorderThickness="${config.borderWidth}"
    CornerRadius="${config.borderRadius}"
    Padding="${padding}"
    Margin="${margin}"
    Opacity="${config.opacity}"
    HorizontalAlignment="Center"
    VerticalAlignment="Center" />`;
  }
};

export function generateComponentCode(
  framework: Framework,
  config: ComponentConfig,
  componentName: string
): string {
  switch (framework) {
    case 'react':
      return generateReactCode(config, componentName);
    case 'angular':
      return generateAngularCode(config, componentName);
    case 'streamlit':
      return generateStreamlitCode(config, componentName);
    case 'tkinter':
      return generateTkinterCode(config, componentName);
    case 'winui3':
      return generateWinUI3Code(config, componentName);
    default:
      return generateReactCode(config, componentName);
  }
}

export function getSuggestedFileName(componentName: string, framework: Framework): string {
  const slug = toKebabCase(componentName);
  const snake = slug.replace(/-/g, '_');
  const pascal = toPascalCase(componentName);
  switch (framework) {
    case 'react':
      return `${pascal}.tsx`;
    case 'angular':
      return `${slug}.component.ts`;
    case 'streamlit':
      return `${snake}_streamlit.py`;
    case 'tkinter':
      return `${snake}_tk.py`;
    case 'winui3':
      return `${pascal}.xaml`;
    default:
      return `${slug}.txt`;
  }
}
