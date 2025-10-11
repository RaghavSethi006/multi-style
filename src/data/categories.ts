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
      { id: 'heading', name: 'Heading', available: true },
      { id: 'paragraph', name: 'Paragraph', available: true },
      { id: 'label', name: 'Label', available: true },
      { id: 'blockquote', name: 'Blockquote', available: true },
      { id: 'code', name: 'Code Block', available: true },
    ],
  },
  {
    id: 'buttons',
    name: 'Buttons',
    icon: MousePointerClick,
    components: [
      { id: 'standard-button', name: 'Standard Button', available: true },
      { id: 'icon-button', name: 'Icon Button', available: true },
      { id: 'fab-button', name: 'FAB Button', available: true },
      { id: 'outline-button', name: 'Outline Button', available: true },
      { id: 'toggle-button', name: 'Toggle Button', available: true },
    ],
  },
  {
    id: 'lists',
    name: 'Lists',
    icon: List,
    components: [
      { id: 'simple-list', name: 'Simple List', available: true },
      { id: 'icon-list', name: 'Icon List', available: true },
      { id: 'checkbox-list', name: 'Checkbox List', available: true },
      { id: 'ordered-list', name: 'Ordered List', available: true },
    ],
  },
  {
    id: 'forms',
    name: 'Forms & Inputs',
    icon: FormInput,
    components: [
      { id: 'text-field', name: 'Text Field', available: true },
      { id: 'textarea', name: 'Text Area', available: true },
      { id: 'password-input', name: 'Password Input', available: true },
      { id: 'search-field', name: 'Search Field', available: true },
      { id: 'number-input', name: 'Number Input', available: true },
      { id: 'file-upload', name: 'File Upload', available: true },
      { id: 'color-picker', name: 'Color Picker', available: true },
      { id: 'range-slider', name: 'Range Slider', available: true },
    ],
  },
  {
    id: 'selectors',
    name: 'Selectors',
    icon: ChevronDown,
    components: [
      { id: 'checkbox', name: 'Checkbox', available: true },
      { id: 'radio', name: 'Radio Group', available: true },
      { id: 'switch', name: 'Switch', available: true },
      { id: 'dropdown', name: 'Dropdown', available: true },
      { id: 'autocomplete', name: 'Autocomplete', available: true },
    ],
  },
  {
    id: 'navigation',
    name: 'Navigation',
    icon: Menu,
    components: [
      { id: 'navbar', name: 'Nav Bar', available: true },
      { id: 'tabs', name: 'Tabs', available: true },
      { id: 'breadcrumbs', name: 'Breadcrumbs', available: true },
      { id: 'pagination', name: 'Pagination', available: true },
      { id: 'stepper', name: 'Stepper', available: true },
    ],
  },
  {
    id: 'cards',
    name: 'Cards & Containers',
    icon: LayoutGrid,
    components: [
      { id: 'basic-card', name: 'Basic Card', available: true },
      { id: 'image-card', name: 'Image Card', available: true },
      { id: 'profile-card', name: 'Profile Card', available: true },
      { id: 'accordion', name: 'Accordion', available: true },
    ],
  },
  {
    id: 'feedback',
    name: 'Feedback & Indicators',
    icon: Bell,
    components: [
      { id: 'tooltip', name: 'Tooltip', available: true },
      { id: 'alert', name: 'Alert', available: true },
      { id: 'toast', name: 'Toast', available: true },
      { id: 'modal', name: 'Modal', available: true },
      { id: 'badge', name: 'Badge', available: true },
      { id: 'progress', name: 'Progress Bar', available: true },
      { id: 'skeleton', name: 'Skeleton', available: true },
    ],
  },
  {
    id: 'data',
    name: 'Data Display',
    icon: BarChart3,
    components: [
      { id: 'table', name: 'Table', available: true },
      { id: 'grid', name: 'Grid', available: true },
      { id: 'timeline', name: 'Timeline', available: true },
      { id: 'carousel', name: 'Carousel', available: true },
    ],
  },
  {
    id: 'media',
    name: 'Media & Visuals',
    icon: Image,
    components: [
      { id: 'image', name: 'Image', available: true },
      { id: 'avatar', name: 'Avatar', available: true },
      { id: 'icon', name: 'Icon', available: true },
      { id: 'chart', name: 'Chart', available: true },
    ],
  },
  {
    id: 'advanced',
    name: 'Interactive & Advanced',
    icon: Sparkles,
    components: [
      { id: 'drag-drop', name: 'Drag & Drop', available: true },
      { id: 'split-pane', name: 'Split Pane', available: true },
      { id: 'code-editor', name: 'Code Editor', available: true },
    ],
  },
];
