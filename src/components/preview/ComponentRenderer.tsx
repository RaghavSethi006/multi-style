import React from 'react';
import { StandardButton } from '../StandardButton';

// Button Previews
import { IconButton } from './buttons/IconButton';
import { FABButton } from './buttons/FABButton';
import { OutlineButton } from './buttons/OutlineButton';
import { ToggleButton } from './buttons/ToggleButton';

// Text Previews
import { HeadingPreview } from './text/HeadingPreview';
import { ParagraphPreview } from './text/ParagraphPreview';
import { LabelPreview } from './text/LabelPreview';
import { BlockquotePreview } from './text/BlockquotePreview';
import { CodeBlockPreview } from './text/CodeBlockPreview';

// Input Previews
import {
  TextFieldPreview,
  TextAreaPreview,
  PasswordInputPreview,
  SearchFieldPreview,
  NumberInputPreview,
  FileUploadPreview,
  RangeSliderPreview,
  ColorPickerPreview,
} from './inputs/InputPreviews';

// Selector Previews
import {
  CheckboxPreview,
  RadioGroupPreview,
  SwitchPreview,
  DropdownPreview,
  AutocompletePreview,
} from './selectors/SelectorPreviews';

// Navigation Previews
import {
  NavbarPreview,
  TabsPreview,
  BreadcrumbsPreview,
  PaginationPreview,
  StepperPreview,
} from './navigation/NavigationPreviews';

// Card Previews
import {
  BasicCardPreview,
  ImageCardPreview,
  ProfileCardPreview,
  AccordionPreview,
} from './cards/CardPreviews';

// Feedback Previews
import {
  AlertPreview,
  ToastPreview,
  BadgePreview,
  ProgressPreview,
  SkeletonPreview,
  TooltipPreview,
  ModalPreview,
} from './feedback/FeedbackPreviews';

// List Previews
import {
  SimpleListPreview,
  IconListPreview,
  CheckboxListPreview,
  OrderedListPreview,
} from './lists/ListPreviews';

// Data Display Previews
import {
  TablePreview,
  GridPreview,
  TimelinePreview,
  CarouselPreview,
  ImagePreview,
  AvatarPreview,
  IconPreview,
} from './data/DataPreviews';

// Advanced Previews
import {
  DragDropPreview,
  SplitPanePreview,
  CodeEditorPreview,
  ChartPreview,
} from './advanced/AdvancedPreviews';

const componentMap: Record<string, React.FC> = {
  // Buttons
  'Standard Button': StandardButton,
  'Icon Button': IconButton,
  'FAB Button': FABButton,
  'Outline Button': OutlineButton,
  'Toggle Button': ToggleButton,

  // Text & Typography
  Heading: HeadingPreview,
  Paragraph: ParagraphPreview,
  Label: LabelPreview,
  Blockquote: BlockquotePreview,
  'Code Block': CodeBlockPreview,

  // Forms & Inputs
  'Text Field': TextFieldPreview,
  'Text Area': TextAreaPreview,
  'Password Input': PasswordInputPreview,
  'Search Field': SearchFieldPreview,
  'Number Input': NumberInputPreview,
  'File Upload': FileUploadPreview,
  'Range Slider': RangeSliderPreview,
  'Color Picker': ColorPickerPreview,

  // Selectors
  Checkbox: CheckboxPreview,
  'Radio Group': RadioGroupPreview,
  Switch: SwitchPreview,
  Dropdown: DropdownPreview,
  Autocomplete: AutocompletePreview,

  // Navigation
  'Nav Bar': NavbarPreview,
  Tabs: TabsPreview,
  Breadcrumbs: BreadcrumbsPreview,
  Pagination: PaginationPreview,
  Stepper: StepperPreview,

  // Cards & Containers
  'Basic Card': BasicCardPreview,
  'Image Card': ImageCardPreview,
  'Profile Card': ProfileCardPreview,
  Accordion: AccordionPreview,

  // Feedback & Indicators
  Tooltip: TooltipPreview,
  Alert: AlertPreview,
  Toast: ToastPreview,
  Modal: ModalPreview,
  Badge: BadgePreview,
  'Progress Bar': ProgressPreview,
  Skeleton: SkeletonPreview,

  // Lists
  'Simple List': SimpleListPreview,
  'Icon List': IconListPreview,
  'Checkbox List': CheckboxListPreview,
  'Ordered List': OrderedListPreview,

  // Data Display
  Table: TablePreview,
  Grid: GridPreview,
  Timeline: TimelinePreview,
  Carousel: CarouselPreview,

  // Media & Visuals
  Image: ImagePreview,
  Avatar: AvatarPreview,
  Icon: IconPreview,
  Chart: ChartPreview,

  // Interactive & Advanced
  'Drag & Drop': DragDropPreview,
  'Split Pane': SplitPanePreview,
  'Code Editor': CodeEditorPreview,
};

interface ComponentRendererProps {
  componentName: string;
}

export const ComponentRenderer = ({ componentName }: ComponentRendererProps) => {
  const PreviewComponent = componentMap[componentName];

  if (PreviewComponent) {
    return <PreviewComponent />;
  }

  return (
    <div className="text-center p-8 rounded-2xl bg-card border border-border shadow-lg">
      <div className="text-5xl mb-4">🚧</div>
      <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
      <p className="text-muted-foreground text-sm">
        {componentName} preview is under development
      </p>
    </div>
  );
};
