import { describe, it, expect } from 'vitest';
import { generatePageProjectFiles } from '../pageExporter';
import { defaultPageSettings, type PageNode } from '@/store/usePageStore';
import { buildComponentConfig } from '@/store/useCustomizationStore';

const sampleNodes: PageNode[] = [
  {
    id: 'n1',
    name: 'Hero Heading',
    componentType: 'Heading',
    category: 'Text & Typography',
    config: buildComponentConfig('Heading', { text: 'Ship Faster' }),
    activeState: 'default',
    colSpan: 2,
    align: 'center',
  },
  {
    id: 'n2',
    name: 'Hero Heading',
    componentType: 'Standard Button',
    category: 'Buttons',
    config: buildComponentConfig('Standard Button', { text: 'Get Started' }),
    activeState: 'default',
    colSpan: 1,
    align: 'center',
  },
];

describe('pageExporter', () => {
  it('generates separate React component folders/files imported by the page', () => {
    const project = generatePageProjectFiles(
      { ...defaultPageSettings, name: 'MarketingHome', layoutMode: 'grid', gridColumns: 2 },
      sampleNodes,
      'react'
    );

    expect(project.entryFile).toBe('src/pages/MarketingHome.tsx');
    const paths = project.files.map((f) => f.path);

    // Deduplicated folder/file paths even when two nodes share the same raw name
    expect(paths).toContain('src/components/hero-heading/HeroHeading.tsx');
    expect(paths).toContain('src/components/hero-heading/index.ts');
    expect(paths).toContain('src/components/hero-heading-2/HeroHeading2.tsx');
    expect(paths).toContain('src/components/hero-heading-2/index.ts');
    expect(paths).toContain('src/App.tsx');

    const pageFile = project.files.find((f) => f.path === project.entryFile);
    expect(pageFile?.content).toContain("import { HeroHeading } from '../components/hero-heading';");
    expect(pageFile?.content).toContain("import { HeroHeading2 } from '../components/hero-heading-2';");
    expect(pageFile?.content).toContain('<HeroHeading />');
    expect(pageFile?.content).toContain('<HeroHeading2 />');
  });

  it('generates standalone Angular component folders linked from the page component', () => {
    const project = generatePageProjectFiles(defaultPageSettings, sampleNodes, 'angular');
    const paths = project.files.map((f) => f.path);

    expect(paths).toContain('src/app/components/hero-heading/hero-heading.component.ts');
    expect(paths).toContain('src/app/components/hero-heading-2/hero-heading-2.component.ts');

    const pageFile = project.files.find((f) => f.path === project.entryFile);
    expect(pageFile?.content).toContain('HeroHeadingComponent');
    expect(pageFile?.content).toContain('HeroHeading2Component');
    expect(pageFile?.content).toContain('<app-hero-heading></app-hero-heading>');
    expect(pageFile?.content).toContain('<app-hero-heading-2></app-hero-heading-2>');
  });

  it('generates WinUI 3 UserControl XAML files in Controls/ referenced by Pages/', () => {
    const project = generatePageProjectFiles(defaultPageSettings, sampleNodes, 'winui3');
    const paths = project.files.map((f) => f.path);

    expect(paths).toContain('Controls/HeroHeading.xaml');
    expect(paths).toContain('Controls/HeroHeading.xaml.cs');
    expect(paths).toContain('Controls/HeroHeading2.xaml');
    expect(paths).toContain('Pages/LandingPage.xaml');

    const pageFile = project.files.find((f) => f.path === 'Pages/LandingPage.xaml');
    expect(pageFile?.content).toContain('xmlns:controls="using:App.Controls"');
    expect(pageFile?.content).toContain('<controls:HeroHeading');
    expect(pageFile?.content).toContain('<controls:HeroHeading2');
  });

  it('generates Streamlit and Tkinter component modules imported by the entry script', () => {
    const stProject = generatePageProjectFiles(defaultPageSettings, sampleNodes, 'streamlit');
    expect(stProject.entryFile).toBe('app.py');
    expect(stProject.files.map((f) => f.path)).toContain('components/hero_heading.py');
    expect(stProject.files.find((f) => f.path === 'app.py')?.content).toContain(
      'from components.hero_heading import render_hero_heading'
    );

    const tkProject = generatePageProjectFiles(defaultPageSettings, sampleNodes, 'tkinter');
    expect(tkProject.entryFile).toBe('main.py');
    expect(tkProject.files.map((f) => f.path)).toContain('components/hero_heading.py');
    expect(tkProject.files.find((f) => f.path === 'main.py')?.content).toContain(
      'from components.hero_heading import HeroHeading'
    );
  });
});
