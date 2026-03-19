# multi-style

**A visual UI component customization playground built with React, TypeScript, and shadcn/ui.**

Browse, customize, and export production-ready component code — live, in the browser, with zero setup.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

---

## What is multi-style?

multi-style is an interactive design tool for developers and designers who want to customize UI components visually and get clean, copy-paste-ready code instantly.

Pick a component from the catalog, tweak typography, colors, sizing, effects, and states through a dedicated panel, and watch the live preview update in real time. When you're happy, copy the generated code directly into your project.

---

## Features

- **30+ components** across buttons, inputs, cards, navigation, feedback, lists, selectors, data display, and text
- **6 customization panels** — Appearance, Typography, Size & Layout, Effects, States, and Component-specific options
- **Live code generation** — outputs clean, ready-to-use JSX with Tailwind classes
- **One-click copy** — export the component code directly to your clipboard
- **Component catalog** — browse all components with interactive mini-previews
- **Template system** — save and restore named customization presets
- **Responsive layout** — works across desktop and tablet viewports

---

## Getting started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- npm, yarn, pnpm, or Bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/multi-style.git
cd multi-style

# Install dependencies (pick one)
npm install
# or
bun install
```

### Development

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for production

```bash
npm run build
# or
bun run build
```

The output goes to `dist/`. Preview the production build with:

```bash
npm run preview
```

---

## Project structure

```
multi-style/
├── src/
│   ├── components/
│   │   ├── catalog/          # Component browser (grid + mini-previews)
│   │   ├── customization/    # 6 customization panel components
│   │   ├── preview/          # Full live preview components by category
│   │   │   ├── buttons/
│   │   │   ├── cards/
│   │   │   ├── inputs/
│   │   │   ├── text/
│   │   │   └── ...
│   │   └── ui/               # shadcn/ui base components
│   ├── data/
│   │   └── categories.ts     # Component catalog registry
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Route-level page components
│   ├── store/
│   │   ├── useCustomizationStore.ts   # Active component + style state (Zustand)
│   │   └── useTemplateStore.ts        # Saved template presets (Zustand)
│   └── utils/
│       ├── codeTemplates.ts  # Code generation logic
│       └── download.ts       # Export utilities
├── public/
├── index.html
├── tailwind.config.ts
└── vite.config.ts
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Component library | shadcn/ui + Radix UI |
| State management | Zustand |
| Routing | React Router |
| Icons | Lucide React |
| Package manager | Bun / npm |

---

## Component catalog

| Category | Components |
|---|---|
| Buttons | Standard, Icon, FAB, Outline, Toggle |
| Inputs | Text input, Textarea, Search, OTP |
| Cards | Default, Image, Stats, Profile |
| Navigation | Tabs, Breadcrumb, Pagination, Navbar |
| Feedback | Alert, Badge, Toast, Progress, Skeleton |
| Selectors | Checkbox, Radio, Switch, Select, Slider |
| Lists | Default, Ordered, Description |
| Data | Table, Avatar group, Chart |
| Text | Heading, Paragraph, Label, Blockquote, Code block |
| Advanced | Accordion, Dialog, Drawer, Dropdown, Tooltip |

---

## Contributing

Contributions are welcome! Here's how to get involved:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Make your changes and commit: `git commit -m 'feat: add your feature'`
4. Push to your branch: `git push origin feat/your-feature-name`
5. Open a Pull Request

### Adding a new component

1. Add the component entry to `src/data/categories.ts`
2. Create a preview file under the relevant `src/components/preview/` subfolder
3. Add a mini-preview case in `src/components/catalog/MiniPreview.tsx`
4. Wire up any component-specific customization options in `src/components/customization/ComponentSpecificPanel.tsx`

### Code style

- Follow the existing TypeScript patterns
- Use Tailwind utility classes for all styling
- Keep components focused — one responsibility per file
- Run `npm run lint` before submitting a PR

---

## Roadmap

- [ ] URL-encoded shareable links for customization state
- [ ] Export as CSS variables / design tokens
- [ ] Undo/redo history
- [ ] Responsive preview (mobile/tablet/desktop switcher)
- [ ] Community template gallery
- [ ] Dark mode preview toggle
- [ ] Accessibility score overlay (contrast ratio, WCAG checks)

---

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

## Acknowledgements

Built with [shadcn/ui](https://ui.shadcn.com), [Radix UI](https://www.radix-ui.com), [Tailwind CSS](https://tailwindcss.com), and [Vite](https://vitejs.dev).

---

*Made with care by [Raghav](https://github.com/your-username)*
