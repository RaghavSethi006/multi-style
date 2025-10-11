import {
  Type,
  MousePointerClick,
  List,
  FormInput,
  ChevronDown,
  Menu,
  LayoutGrid,
  Bell,
  BarChart3,
  Image,
  Sparkles,
} from 'lucide-react';

export interface ComponentItem {
  id: string;
  name: string;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: typeof Type;
  components: ComponentItem[];
}

export const categories: Category[] = [
  {
    id: 'text',
    name: 'Text & Typography',
    icon: Type,
    components: [
      { id: 'heading', name: 'Heading', available: false },
      { id: 'paragraph', name: 'Paragraph', available: false },
      { id: 'label', name: 'Label', available: false },
    ],
  },
  {
    id: 'buttons',
    name: 'Buttons',
    icon: MousePointerClick,
    components: [
      { id: 'standard-button', name: 'Standard Button', available: true },
      { id: 'icon-button', name: 'Icon Button', available: false },
      { id: 'fab-button', name: 'FAB Button', available: false },
    ],
  },
  {
    id: 'lists',
    name: 'Lists',
    icon: List,
    components: [
      { id: 'simple-list', name: 'Simple List', available: false },
      { id: 'avatar-list', name: 'Avatar List', available: false },
    ],
  },
  {
    id: 'forms',
    name: 'Forms & Inputs',
    icon: FormInput,
    components: [
      { id: 'text-field', name: 'Text Field', available: false },
      { id: 'textarea', name: 'Text Area', available: false },
      { id: 'checkbox', name: 'Checkbox', available: false },
    ],
  },
  {
    id: 'selectors',
    name: 'Selectors',
    icon: ChevronDown,
    components: [
      { id: 'dropdown', name: 'Dropdown', available: false },
      { id: 'radio', name: 'Radio Group', available: false },
    ],
  },
  {
    id: 'navigation',
    name: 'Navigation',
    icon: Menu,
    components: [
      { id: 'navbar', name: 'Nav Bar', available: false },
      { id: 'tabs', name: 'Tabs', available: false },
    ],
  },
  {
    id: 'cards',
    name: 'Cards & Containers',
    icon: LayoutGrid,
    components: [
      { id: 'card', name: 'Card', available: false },
      { id: 'panel', name: 'Panel', available: false },
    ],
  },
  {
    id: 'feedback',
    name: 'Feedback & Indicators',
    icon: Bell,
    components: [
      { id: 'alert', name: 'Alert', available: false },
      { id: 'toast', name: 'Toast', available: false },
      { id: 'progress', name: 'Progress Bar', available: false },
    ],
  },
  {
    id: 'data',
    name: 'Data Display',
    icon: BarChart3,
    components: [
      { id: 'table', name: 'Table', available: false },
      { id: 'chart', name: 'Chart', available: false },
    ],
  },
  {
    id: 'media',
    name: 'Media & Visuals',
    icon: Image,
    components: [
      { id: 'image', name: 'Image', available: false },
      { id: 'avatar', name: 'Avatar', available: false },
    ],
  },
  {
    id: 'advanced',
    name: 'Interactive & Advanced',
    icon: Sparkles,
    components: [
      { id: 'modal', name: 'Modal', available: false },
      { id: 'tooltip', name: 'Tooltip', available: false },
    ],
  },
];
