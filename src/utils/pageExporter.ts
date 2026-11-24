import type { Framework } from '@/store/useCustomizationStore';
import type { PageNode, PageSettings } from '@/store/usePageStore';
import {
  escapeHtml,
  escapeJsString,
  escapeJsxText,
  escapePythonString,
  generateAngularCode,
  generateReactCode,
  generateStreamlitCode,
  generateTkinterCode,
  generateWinUI3Code,
  toKebabCase,
  toPascalCase,
} from './codeTemplates';

export interface ExportedFile {
  path: string;
  content: string;
  language: 'tsx' | 'typescript' | 'python' | 'xml' | 'csharp' | 'markdown';
}

export interface ExportedPageProject {
  rootFolder: string;
  entryFile: string;
  files: ExportedFile[];
}

interface ResolvedNodeSymbol {
  node: PageNode;
  pascal: string;
  kebab: string;
  snake: string;
}

function safePascalIdentifier(raw: string, fallback = 'Component'): string {
  const pascal = toPascalCase(raw);
  const sanitized = pascal.replace(/[^a-zA-Z0-9]/g, '') || fallback;
  return /^[0-9]/.test(sanitized) ? `Cmp${sanitized}` : sanitized;
}

function safeSnakeIdentifier(raw: string): string {
  const snake = toKebabCase(raw).replace(/-/g, '_').replace(/[^a-z0-9_]/g, '') || 'component';
  return /^[0-9]/.test(snake) ? `cmp_${snake}` : snake;
}

function resolveUniqueSymbols(nodes: PageNode[]): ResolvedNodeSymbol[] {
  const usedKeys = new Set<string>();
  return nodes.map((node, index) => {
    const baseName = node.name?.trim() || `${node.componentType} ${index + 1}`;
    let candidate = baseName;
    let suffix = 2;
    while (usedKeys.has(safePascalIdentifier(candidate).toLowerCase())) {
      candidate = `${baseName} ${suffix}`;
      suffix += 1;
    }
    const pascal = safePascalIdentifier(candidate);
    usedKeys.add(pascal.toLowerCase());
    const kebab = toKebabCase(candidate);
    const snake = safeSnakeIdentifier(candidate);
    return { node, pascal, kebab, snake };
  });
}

function buildReadme(
  pageSettings: PageSettings,
  symbols: ResolvedNodeSymbol[],
  framework: Framework,
  entryFile: string,
  filePaths: string[]
): string {
  const lines = [
    `# ${pageSettings.title || pageSettings.name}`,
    '',
    pageSettings.description || 'Generated with Universal Component Customizer Page Maker.',
    '',
    `- **Framework**: ${framework}`,
    `- **Entry Page**: \`${entryFile}\``,
    `- **Components (${symbols.length})**: ${symbols.length > 0 ? symbols.map((s) => `\`${s.pascal}\` (${s.node.componentType})`).join(', ') : 'None yet'}`,
    '',
    '## Folder Structure',
    '',
    '```text',
    ...filePaths,
    '```',
  ];
  return lines.join('\n');
}

function alignToCssJustify(align: PageNode['align']): string {
  switch (align) {
    case 'start':
      return 'start';
    case 'center':
      return 'center';
    case 'end':
      return 'end';
    default:
      return 'stretch';
  }
}

function generateReactProject(
  pageSettings: PageSettings,
  symbols: ResolvedNodeSymbol[]
): ExportedPageProject {
  const pagePascal = safePascalIdentifier(pageSettings.name || 'CustomPage', 'CustomPage');
  const files: ExportedFile[] = [];

  for (const sym of symbols) {
    const rawCode = generateReactCode(sym.node.config, sym.node.componentType);
    const renamedCode = rawCode.replace(
      /export function Custom[A-Za-z0-9_]+\(/,
      `export function ${sym.pascal}(`
    );

    files.push({
      path: `src/components/${sym.kebab}/${sym.pascal}.tsx`,
      content: renamedCode,
      language: 'tsx',
    });

    files.push({
      path: `src/components/${sym.kebab}/index.ts`,
      content: `export { ${sym.pascal} } from './${sym.pascal}';\n`,
      language: 'typescript',
    });
  }

  const imports = symbols
    .map((sym) => `import { ${sym.pascal} } from '../components/${sym.kebab}';`)
    .join('\n');

  const isGrid = pageSettings.layoutMode === 'grid';
  const renderedChildren =
    symbols.length === 0
      ? `        <p style={{ color: '#6B7280', textAlign: 'center', margin: 0 }}>Empty page canvas</p>`
      : symbols
          .map((sym) => {
            const spanStyle = isGrid && sym.node.colSpan > 1
              ? `gridColumn: 'span ${Math.min(sym.node.colSpan, pageSettings.gridColumns)}', `
              : '';
            const alignValue = alignToCssJustify(sym.node.align);
            return `        <div style={{ ${spanStyle}justifySelf: '${alignValue}', display: 'flex', justifyContent: '${alignValue === 'stretch' ? 'flex-start' : alignValue}' }}>\n          <${sym.pascal} />\n        </div>`;
          })
          .join('\n');

  const containerStyle = isGrid
    ? `{
          maxWidth: '${pageSettings.maxWidth}px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(${pageSettings.gridColumns}, minmax(0, 1fr))',
          gap: '${pageSettings.gap}px',
          alignItems: 'start',
        }`
    : `{
          maxWidth: '${pageSettings.maxWidth}px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '${pageSettings.gap}px',
        }`;

  const pageContent = `${imports ? `${imports}\n\n` : ''}export function ${pagePascal}() {
  return (
    <main
      aria-label="${escapeHtml(pageSettings.title || pagePascal)}"
      style={{
        minHeight: '100vh',
        backgroundColor: '${escapeJsString(pageSettings.backgroundColor || '#FFFFFF')}',
        padding: '${pageSettings.padding}px',
      }}
    >
      <div
        style={${containerStyle}}
      >
${renderedChildren}
      </div>
    </main>
  );
}
`;

  const entryFile = `src/pages/${pagePascal}.tsx`;
  files.push({
    path: entryFile,
    content: pageContent,
    language: 'tsx',
  });

  files.push({
    path: 'src/App.tsx',
    content: `import { ${pagePascal} } from './pages/${pagePascal}';\n\nexport default function App() {\n  return <${pagePascal} />;\n}\n`,
    language: 'tsx',
  });

  files.push({
    path: 'README.md',
    content: buildReadme(
      pageSettings,
      symbols,
      'react',
      entryFile,
      [...files.map((f) => f.path), 'README.md']
    ),
    language: 'markdown',
  });

  return {
    rootFolder: toKebabCase(pageSettings.name || 'custom-page'),
    entryFile,
    files,
  };
}

function generateAngularProject(
  pageSettings: PageSettings,
  symbols: ResolvedNodeSymbol[]
): ExportedPageProject {
  const pageKebab = toKebabCase(pageSettings.name || 'custom-page');
  const pagePascal = `${safePascalIdentifier(pageSettings.name || 'CustomPage', 'CustomPage')}Component`;
  const files: ExportedFile[] = [];

  for (const sym of symbols) {
    const rawCode = generateAngularCode(sym.node.config, sym.node.componentType);
    const updated = rawCode
      .replace(/^\/\/ [^\n]+/, `// src/app/components/${sym.kebab}/${sym.kebab}.component.ts`)
      .replace(/selector:\s*'app-[^']+'/, `selector: 'app-${sym.kebab}'`)
      .replace(/export class [A-Za-z0-9_]+Component \{\}/, `export class ${sym.pascal}Component {}`);

    files.push({
      path: `src/app/components/${sym.kebab}/${sym.kebab}.component.ts`,
      content: updated,
      language: 'typescript',
    });
  }

  const imports = symbols
    .map(
      (sym) =>
        `import { ${sym.pascal}Component } from '../../components/${sym.kebab}/${sym.kebab}.component';`
    )
    .join('\n');

  const isGrid = pageSettings.layoutMode === 'grid';
  const childTags =
    symbols.length === 0
      ? `        <p class="empty-note">Empty page canvas</p>`
      : symbols
          .map((sym) => {
            const spanAttr =
              isGrid && sym.node.colSpan > 1
                ? ` style="grid-column: span ${Math.min(sym.node.colSpan, pageSettings.gridColumns)};"`
                : '';
            return `        <div class="node-slot"${spanAttr}>\n          <app-${sym.kebab}></app-${sym.kebab}>\n        </div>`;
          })
          .join('\n');

  const containerCss = isGrid
    ? `      display: grid;\n      grid-template-columns: repeat(${pageSettings.gridColumns}, minmax(0, 1fr));`
    : `      display: flex;\n      flex-direction: column;`;

  const entryFile = `src/app/pages/${pageKebab}/${pageKebab}.component.ts`;
  files.push({
    path: entryFile,
    content: `// ${entryFile}
import { Component } from '@angular/core';
${imports}

@Component({
  selector: 'app-${pageKebab}',
  standalone: true,
  imports: [${symbols.map((s) => `${s.pascal}Component`).join(', ')}],
  template: \`
    <main class="page-shell">
      <div class="page-container">
${childTags}
      </div>
    </main>
  \`,
  styles: [\`
    .page-shell {
      min-height: 100vh;
      background: ${pageSettings.backgroundColor || '#FFFFFF'};
      padding: ${pageSettings.padding}px;
    }
    .page-container {
      max-width: ${pageSettings.maxWidth}px;
      margin: 0 auto;
${containerCss}
      gap: ${pageSettings.gap}px;
    }
  \`]
})
export class ${pagePascal} {}
`,
    language: 'typescript',
  });

  files.push({
    path: 'README.md',
    content: buildReadme(
      pageSettings,
      symbols,
      'angular',
      entryFile,
      [...files.map((f) => f.path), 'README.md']
    ),
    language: 'markdown',
  });

  return {
    rootFolder: pageKebab,
    entryFile,
    files,
  };
}

function generateStreamlitProject(
  pageSettings: PageSettings,
  symbols: ResolvedNodeSymbol[]
): ExportedPageProject {
  const files: ExportedFile[] = [];

  for (const sym of symbols) {
    const raw = generateStreamlitCode(sym.node.config, sym.node.componentType);
    const bodyWithoutImport = raw
      .replace(/^import streamlit as st\s*\n*/, '')
      .replace(/key="custom_component"/g, `key="${sym.snake}"`);

    const indentedBody = bodyWithoutImport
      .split('\n')
      .map((line) => (line ? `    ${line}` : ''))
      .join('\n');

    files.push({
      path: `components/${sym.snake}.py`,
      content: `import streamlit as st\n\n\ndef render_${sym.snake}():\n${indentedBody}\n`,
      language: 'python',
    });
  }

  const imports = symbols
    .map((sym) => `from components.${sym.snake} import render_${sym.snake}`)
    .join('\n');

  let bodyLines: string[] = [];
  if (symbols.length === 0) {
    bodyLines = [`st.info("Empty page canvas")`];
  } else if (pageSettings.layoutMode === 'grid' && pageSettings.gridColumns > 1) {
    const colsCount = pageSettings.gridColumns;
    for (let i = 0; i < symbols.length; i += colsCount) {
      const chunk = symbols.slice(i, i + colsCount);
      bodyLines.push(`cols = st.columns(${colsCount})`);
      chunk.forEach((sym, colIdx) => {
        bodyLines.push(`with cols[${colIdx}]:`);
        bodyLines.push(`    render_${sym.snake}()`);
      });
    }
  } else {
    bodyLines = symbols.map((sym) => `render_${sym.snake}()`);
  }

  const entryFile = 'app.py';
  files.push({
    path: entryFile,
    content: `import streamlit as st
${imports ? `${imports}\n` : ''}
st.set_page_config(page_title="${escapePythonString(pageSettings.title || pageSettings.name)}", layout="wide")

st.markdown("""
<style>
.stApp {
    background-color: ${pageSettings.backgroundColor || '#FFFFFF'};
}
.block-container {
    max-width: ${pageSettings.maxWidth}px;
    padding: ${pageSettings.padding}px;
}
</style>
""", unsafe_allow_html=True)

${bodyLines.join('\n')}
`,
    language: 'python',
  });

  files.push({
    path: 'README.md',
    content: buildReadme(
      pageSettings,
      symbols,
      'streamlit',
      entryFile,
      [...files.map((f) => f.path), 'README.md']
    ),
    language: 'markdown',
  });

  return {
    rootFolder: toKebabCase(pageSettings.name || 'custom-page'),
    entryFile,
    files,
  };
}

function generateTkinterProject(
  pageSettings: PageSettings,
  symbols: ResolvedNodeSymbol[]
): ExportedPageProject {
  const files: ExportedFile[] = [];

  for (const sym of symbols) {
    const raw = generateTkinterCode(sym.node.config, sym.node.componentType);
    const withoutMain = raw.replace(/\nif __name__ == "__main__":[\s\S]*$/, '');
    const renamed = withoutMain.replace(/class Custom[A-Za-z0-9_]+:/, `class ${sym.pascal}:`);

    files.push({
      path: `components/${sym.snake}.py`,
      content: `${renamed}\n`,
      language: 'python',
    });
  }

  const imports = symbols
    .map((sym) => `from components.${sym.snake} import ${sym.pascal}`)
    .join('\n');

  const isGrid = pageSettings.layoutMode === 'grid';
  const mountLines =
    symbols.length === 0
      ? `    tk.Label(container, text="Empty page canvas", bg="${pageSettings.backgroundColor || '#FFFFFF'}").pack()`
      : symbols
          .map((sym, idx) => {
            const varName = `comp_${idx + 1}`;
            if (isGrid) {
              const row = Math.floor(idx / pageSettings.gridColumns);
              const col = idx % pageSettings.gridColumns;
              return `    ${varName} = ${sym.pascal}(container)\n    ${varName}.widget.grid(row=${row}, column=${col}, padx=${Math.round(pageSettings.gap / 2)}, pady=${Math.round(pageSettings.gap / 2)}, sticky="ew")`;
            }
            return `    ${varName} = ${sym.pascal}(container)\n    ${varName}.widget.pack(fill="x", pady=${Math.round(pageSettings.gap / 2)})`;
          })
          .join('\n');

  const gridConfigLines = isGrid
    ? Array.from(
        { length: pageSettings.gridColumns },
        (_, c) => `    container.grid_columnconfigure(${c}, weight=1)`
      ).join('\n')
    : '';

  const entryFile = 'main.py';
  files.push({
    path: entryFile,
    content: `import tkinter as tk
${imports ? `${imports}\n` : ''}
def main():
    root = tk.Tk()
    root.title("${escapePythonString(pageSettings.title || pageSettings.name)}")
    root.configure(bg="${pageSettings.backgroundColor || '#FFFFFF'}")

    container = tk.Frame(
        root,
        bg="${pageSettings.backgroundColor || '#FFFFFF'}",
        padx=${pageSettings.padding},
        pady=${pageSettings.padding},
    )
    container.pack(fill="both", expand=True)
${gridConfigLines ? `${gridConfigLines}\n` : ''}
${mountLines}

    root.mainloop()


if __name__ == "__main__":
    main()
`,
    language: 'python',
  });

  files.push({
    path: 'README.md',
    content: buildReadme(
      pageSettings,
      symbols,
      'tkinter',
      entryFile,
      [...files.map((f) => f.path), 'README.md']
    ),
    language: 'markdown',
  });

  return {
    rootFolder: toKebabCase(pageSettings.name || 'custom-page'),
    entryFile,
    files,
  };
}

function generateWinUI3Project(
  pageSettings: PageSettings,
  symbols: ResolvedNodeSymbol[]
): ExportedPageProject {
  const pagePascal = safePascalIdentifier(pageSettings.name || 'CustomPage', 'CustomPage');
  const files: ExportedFile[] = [];

  for (const sym of symbols) {
    const innerXaml = generateWinUI3Code(sym.node.config, sym.node.componentType)
      .split('\n')
      .map((line) => `    ${line}`)
      .join('\n');

    files.push({
      path: `Controls/${sym.pascal}.xaml`,
      content: `<UserControl
    x:Class="App.Controls.${sym.pascal}"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
${innerXaml}
</UserControl>
`,
      language: 'xml',
    });

    files.push({
      path: `Controls/${sym.pascal}.xaml.cs`,
      content: `using Microsoft.UI.Xaml.Controls;

namespace App.Controls
{
    public sealed partial class ${sym.pascal} : UserControl
    {
        public ${sym.pascal}()
        {
            this.InitializeComponent();
        }
    }
}
`,
      language: 'csharp',
    });
  }

  const isGrid = pageSettings.layoutMode === 'grid';
  let layoutBody = '';
  if (symbols.length === 0) {
    layoutBody = `        <TextBlock Text="Empty page canvas" Foreground="#6B7280" HorizontalAlignment="Center" />`;
  } else if (isGrid) {
    const colDefs = Array.from(
      { length: pageSettings.gridColumns },
      () => `            <ColumnDefinition Width="*" />`
    ).join('\n');
    const rowCount = Math.ceil(symbols.length / pageSettings.gridColumns);
    const rowDefs = Array.from(
      { length: rowCount },
      () => `            <RowDefinition Height="Auto" />`
    ).join('\n');
    const items = symbols
      .map((sym, idx) => {
        const row = Math.floor(idx / pageSettings.gridColumns);
        const col = idx % pageSettings.gridColumns;
        const span = sym.node.colSpan > 1 ? ` Grid.ColumnSpan="${Math.min(sym.node.colSpan, pageSettings.gridColumns)}"` : '';
        return `            <controls:${sym.pascal} Grid.Row="${row}" Grid.Column="${col}"${span} />`;
      })
      .join('\n');
    layoutBody = `        <Grid ColumnSpacing="${pageSettings.gap}" RowSpacing="${pageSettings.gap}">
            <Grid.ColumnDefinitions>
${colDefs}
            </Grid.ColumnDefinitions>
            <Grid.RowDefinitions>
${rowDefs}
            </Grid.RowDefinitions>
${items}
        </Grid>`;
  } else {
    const items = symbols
      .map((sym) => `            <controls:${sym.pascal} />`)
      .join('\n');
    layoutBody = `        <StackPanel Spacing="${pageSettings.gap}">
${items}
        </StackPanel>`;
  }

  const entryFile = `Pages/${pagePascal}.xaml`;
  files.push({
    path: entryFile,
    content: `<Page
    x:Class="App.Pages.${pagePascal}"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:controls="using:App.Controls"
    Background="${pageSettings.backgroundColor || '#FFFFFF'}">
    <ScrollViewer>
        <Grid MaxWidth="${pageSettings.maxWidth}" Padding="${pageSettings.padding}" HorizontalAlignment="Stretch">
${layoutBody}
        </Grid>
    </ScrollViewer>
</Page>
`,
    language: 'xml',
  });

  files.push({
    path: `Pages/${pagePascal}.xaml.cs`,
    content: `using Microsoft.UI.Xaml.Controls;

namespace App.Pages
{
    public sealed partial class ${pagePascal} : Page
    {
        public ${pagePascal}()
        {
            this.InitializeComponent();
        }
    }
}
`,
    language: 'csharp',
  });

  files.push({
    path: 'README.md',
    content: buildReadme(
      pageSettings,
      symbols,
      'winui3',
      entryFile,
      [...files.map((f) => f.path), 'README.md']
    ),
    language: 'markdown',
  });

  return {
    rootFolder: pagePascal,
    entryFile,
    files,
  };
}

export function generatePageProjectFiles(
  pageSettings: PageSettings,
  nodes: PageNode[],
  framework: Framework
): ExportedPageProject {
  const symbols = resolveUniqueSymbols(nodes);

  switch (framework) {
    case 'react':
      return generateReactProject(pageSettings, symbols);
    case 'angular':
      return generateAngularProject(pageSettings, symbols);
    case 'streamlit':
      return generateStreamlitProject(pageSettings, symbols);
    case 'tkinter':
      return generateTkinterProject(pageSettings, symbols);
    case 'winui3':
      return generateWinUI3Project(pageSettings, symbols);
    default:
      return generateReactProject(pageSettings, symbols);
  }
}

export async function downloadPageProjectZip(
  pageSettings: PageSettings,
  nodes: PageNode[],
  framework: Framework
): Promise<string> {
  const JSZip = (await import('jszip')).default;
  const project = generatePageProjectFiles(pageSettings, nodes, framework);
  const zip = new JSZip();
  const root = zip.folder(project.rootFolder);

  if (root) {
    for (const file of project.files) {
      root.file(file.path, file.content);
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const filename = `${project.rootFolder}-${framework}.zip`;
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return filename;
}

// Re-export escapeJsxText so downstream helpers/tests stay clean if needed
export { escapeJsxText };
