# multi-style

**Customize UI components visually and export production-ready code — in React, Angular, Streamlit, tkinter, or WinUI3.**

Most component tools lock you into one framework. multi-style doesn't. Design your component once, then export it to whichever stack you're building in — whether that's a React web app, an Angular enterprise frontend, a Python Streamlit dashboard, a tkinter desktop tool, or a Windows-native WinUI3 application.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

---

## What is multi-style?

multi-style is an open-source component customization playground that spans the full spectrum of UI frameworks — from web to desktop to Python.

Pick a component, customize it visually through dedicated panels (colors, typography, sizing, effects, states), watch it update live in the preview, then export clean, idiomatic code for the framework of your choice. No boilerplate hunting. No framework-specific docs-diving. Just your component, ready to paste.

---

## Supported export targets

| Framework | Platform | Language |
|---|---|---|
| **React** | Web | TypeScript / JSX |
| **Angular** | Web | TypeScript |
| **Streamlit** | Web / Data apps | Python |
| **tkinter** | Desktop (cross-platform) | Python |
| **WinUI3** | Windows native | C# / XAML |

This is what makes multi-style different from every other component playground. Storybook, Radix Themes, shadcn — they all export to one target. multi-style generates correct, idiomatic output for each framework from the same visual customization state.

---

## Features

- **49 components across 11 categories** covering buttons, inputs, cards, navigation, feedback, lists, selectors, data display, media, text, and interactive components
- **5 export targets** — React, Angular, Streamlit, tkinter, and WinUI3
- **6 customization panels** — Appearance, Typography, Size & Layout, Effects, States, and Component-specific options
- **Live preview** — every change reflects instantly with desktop, tablet, and mobile viewports
- **Component-aware code generation** — outputs idiomatic React, Angular, Streamlit, Tkinter, and WinUI3 code tailored to the active component
- **One-click copy & download** — export directly to your clipboard or download source files
- **Component catalog** — browse and search all components with interactive mini-previews
- **Template & framework system** — save, duplicate, organize, and import/export JSON design systems with Zod validation

---

## Getting started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/RaghavSethi006/multi-style.git
cd multi-style

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality checks & tests

```bash
# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Run unit tests
npm test
```

### Build for production

```bash
npm run build
```

---

## How multi-framework export works

The core challenge of multi-style is translating a single visual state — a set of style properties like `borderRadius: 8`, `fontWeight: 500`, `backgroundColor: #3B82F6` — into idiomatic, correct code for five completely different frameworks and paradigms.

Each framework has its own conventions:

- **React** uses JSX with Tailwind utility classes and component props
- **Angular** uses component decorators, `[(ngModel)]` bindings, and scoped CSS
- **Streamlit** uses Python function calls with keyword arguments (`st.button("Click me", type="primary")`)
- **tkinter** uses object-oriented widget configuration (`ttk.Button(root, text="Click me", style="Custom.TButton")`)
- **WinUI3** uses XAML markup with C# code-behind (`<Button Style="{StaticResource AccentButtonStyle}">`)

`codeTemplates.ts` handles this translation layer — it takes the unified customization store state and runs it through a per-framework code generator, each of which knows the idioms, property names, and file structure of its target.

---

## Project structure

```
multi-style/
├── src/
│   ├── components/
│   │   ├── catalog/          # Component browser (grid + mini-previews)
│   │   ├── customization/    # 6 customization panel components
│   │   ├── preview/          # Live preview components by category
│   │   │   ├── buttons/
│   │   │   ├── cards/
│   │   │   ├── data/
│   │   │   ├── feedback/
│   │   │   ├── inputs/
│   │   │   ├── lists/
│   │   │   ├── navigation/
│   │   │   ├── selectors/
│   │   │   └── text/
│   │   └── ui/               # shadcn/ui base components
│   ├── data/
│   │   └── categories.ts     # Component catalog registry (49 components)
│   ├── hooks/                # Custom React hooks
│   ├── lib/
│   │   ├── icons.ts          # Curated tree-shakeable Lucide icon registry
│   │   ├── styleUtils.ts     # Color, shadow, gradient, and state style helpers
│   │   └── utils.ts          # Classname merge helper
│   ├── pages/                # Route-level page components (Home, Playground, Templates, Frameworks)
│   ├── store/
│   │   ├── useCustomizationStore.ts   # Persisted component + style state
│   │   └── useTemplateStore.ts        # Saved templates & validated JSON framework import/export
│   └── utils/
│       ├── codeTemplates.ts  # Component-aware multi-framework code generation engine
│       └── download.ts       # Export and clipboard utilities
├── public/
├── index.html
├── tailwind.config.ts
└── vite.config.ts
```

---

## Component catalog

| Category | Components |
|---|---|
| Text & Typography | Heading, Paragraph, Label, Blockquote, Code Block |
| Buttons | Standard Button, Icon Button, FAB Button, Outline Button, Toggle Button |
| Lists | Simple List, Icon List, Checkbox List, Ordered List |
| Forms & Inputs | Text Field, Text Area, Password Input, Search Field, Number Input, File Upload, Color Picker, Range Slider |
| Selectors | Checkbox, Radio Group, Switch, Dropdown, Autocomplete |
| Navigation | Nav Bar, Tabs, Breadcrumbs, Pagination, Stepper |
| Cards & Containers | Basic Card, Image Card, Profile Card, Accordion |
| Feedback & Indicators | Tooltip, Alert, Toast, Modal, Badge, Progress Bar, Skeleton |
| Data Display | Table, Grid, Timeline, Carousel |
| Media & Visuals | Image, Avatar, Icon, Chart |
| Interactive & Advanced | Drag & Drop, Split Pane, Code Editor |

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Component library | shadcn/ui + Radix UI |
| State management | Zustand |
| Validation | Zod |
| Testing | Vitest |
| Routing | React Router |
| Icons | Lucide React |

---

## Contributing

Contributions are welcome — especially adding support for new export targets.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push and open a Pull Request

### Adding a new export framework

1. Add a new generator function in `src/utils/codeTemplates.ts`
2. Follow the existing per-framework pattern — take the store state as input, return a code string
3. Add the new framework option to the export UI in `CodeView.tsx`
4. Test with at least 5 different components across different categories

### Adding a new component

1. Add the entry to `src/data/categories.ts`
2. Create a preview file under `src/components/preview/`
3. Add a mini-preview case in `src/components/catalog/MiniPreview.tsx`
4. Add code templates for all 5 export targets in `codeTemplates.ts`

---

## Roadmap

- [ ] Vue 3 export support
- [ ] SwiftUI export support
- [ ] URL-encoded shareable customization links
- [ ] Export as design tokens (CSS variables + Tailwind config)
- [ ] Undo/redo history (Cmd+Z)
- [ ] Responsive preview switcher (mobile / tablet / desktop)
- [ ] Community template gallery
- [ ] Accessibility score overlay (WCAG contrast checks)

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

*Built by [Raghav Sethi](https://github.com/RaghavSethi006)*
