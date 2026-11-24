import { useCustomizationStore, PreviewBackground } from '@/store/useCustomizationStore';
import { StandardButton } from './StandardButton';
import { cn } from '@/lib/utils';
import { Monitor, Tablet, Smartphone, Sun, Moon, Grid3X3 } from 'lucide-react';
import { useState } from 'react';

// Button Previews
import { IconButton } from './preview/buttons/IconButton';
import { FABButton } from './preview/buttons/FABButton';
import { OutlineButton } from './preview/buttons/OutlineButton';
import { ToggleButton } from './preview/buttons/ToggleButton';

// Text Previews
import { HeadingPreview } from './preview/text/HeadingPreview';
import { ParagraphPreview } from './preview/text/ParagraphPreview';
import { LabelPreview } from './preview/text/LabelPreview';
import { BlockquotePreview } from './preview/text/BlockquotePreview';
import { CodeBlockPreview } from './preview/text/CodeBlockPreview';

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
} from './preview/inputs/InputPreviews';

// Selector Previews
import {
  CheckboxPreview,
  RadioGroupPreview,
  SwitchPreview,
  DropdownPreview,
  AutocompletePreview,
} from './preview/selectors/SelectorPreviews';

// Navigation Previews
import {
  NavbarPreview,
  TabsPreview,
  BreadcrumbsPreview,
  PaginationPreview,
  StepperPreview,
} from './preview/navigation/NavigationPreviews';

// Card Previews
import {
  BasicCardPreview,
  ImageCardPreview,
  ProfileCardPreview,
  AccordionPreview,
} from './preview/cards/CardPreviews';

// Feedback Previews
import {
  AlertPreview,
  ToastPreview,
  BadgePreview,
  ProgressPreview,
  SkeletonPreview,
  TooltipPreview,
  ModalPreview,
} from './preview/feedback/FeedbackPreviews';

// List Previews
import {
  SimpleListPreview,
  IconListPreview,
  CheckboxListPreview,
  OrderedListPreview,
} from './preview/lists/ListPreviews';

// Data Display Previews
import {
  TablePreview,
  GridPreview,
  TimelinePreview,
  CarouselPreview,
  ImagePreview,
  AvatarPreview,
  IconPreview,
} from './preview/data/DataPreviews';

// Advanced Previews
import {
  DragDropPreview,
  SplitPanePreview,
  CodeEditorPreview,
  ChartPreview,
} from './preview/advanced/AdvancedPreviews';

type DeviceFrame = 'desktop' | 'tablet' | 'mobile';

// Map component names to their preview components
const componentMap: Record<string, React.FC> = {
  // Buttons
  'Standard Button': StandardButton,
  'Icon Button': IconButton,
  'FAB Button': FABButton,
  'Outline Button': OutlineButton,
  'Toggle Button': ToggleButton,
  
  // Text & Typography
  'Heading': HeadingPreview,
  'Paragraph': ParagraphPreview,
  'Label': LabelPreview,
  'Blockquote': BlockquotePreview,
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
  'Checkbox': CheckboxPreview,
  'Radio Group': RadioGroupPreview,
  'Switch': SwitchPreview,
  'Dropdown': DropdownPreview,
  'Autocomplete': AutocompletePreview,
  
  // Navigation
  'Nav Bar': NavbarPreview,
  'Tabs': TabsPreview,
  'Breadcrumbs': BreadcrumbsPreview,
  'Pagination': PaginationPreview,
  'Stepper': StepperPreview,
  
  // Cards & Containers
  'Basic Card': BasicCardPreview,
  'Image Card': ImageCardPreview,
  'Profile Card': ProfileCardPreview,
  'Accordion': AccordionPreview,
  
  // Feedback & Indicators
  'Alert': AlertPreview,
  'Toast': ToastPreview,
  'Badge': BadgePreview,
  'Progress Bar': ProgressPreview,
  'Skeleton': SkeletonPreview,
  'Tooltip': TooltipPreview,
  'Modal': ModalPreview,
  
  // Lists
  'Simple List': SimpleListPreview,
  'Icon List': IconListPreview,
  'Checkbox List': CheckboxListPreview,
  'Ordered List': OrderedListPreview,
  
  // Data Display
  'Table': TablePreview,
  'Grid': GridPreview,
  'Timeline': TimelinePreview,
  'Carousel': CarouselPreview,
  
  // Media & Visuals
  'Image': ImagePreview,
  'Avatar': AvatarPreview,
  'Icon': IconPreview,
  'Chart': ChartPreview,
  
  // Interactive & Advanced
  'Drag & Drop': DragDropPreview,
  'Split Pane': SplitPanePreview,
  'Code Editor': CodeEditorPreview,
};

export const PreviewArea = () => {
  const { selectedComponent, previewBackground, setPreviewBackground, activeState } = useCustomizationStore();
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrame>('desktop');

  const backgroundClasses = {
    light: 'bg-white',
    dark: 'bg-gray-900',
    checkered: 'bg-[length:20px_20px] bg-[linear-gradient(45deg,#f0f0f0_25%,transparent_25%,transparent_75%,#f0f0f0_75%,#f0f0f0),linear-gradient(45deg,#f0f0f0_25%,transparent_25%,transparent_75%,#f0f0f0_75%,#f0f0f0)] bg-[position:0_0,10px_10px] bg-gray-100',
  };

  const deviceSizes = {
    desktop: 'w-full h-full',
    tablet: 'w-[768px] max-w-full h-[1024px] max-h-full',
    mobile: 'w-[375px] max-w-full h-[667px] max-h-full',
  };

  const renderComponent = () => {
    const PreviewComponent = componentMap[selectedComponent];
    
    if (PreviewComponent) {
      return <PreviewComponent />;
    }

    return (
      <div className="text-center p-8 rounded-2xl bg-card border border-border shadow-lg">
        <div className="text-5xl mb-4">🚧</div>
        <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
        <p className="text-muted-foreground text-sm">
          {selectedComponent} preview is under development
        </p>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-muted/30 min-h-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-card border-b border-border flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-muted-foreground truncate">
            {selectedComponent}
          </span>
          {activeState !== 'default' && (
            <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded shrink-0">
              {activeState} state
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Device Frames */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1" role="group" aria-label="Viewport size">
            <button
              type="button"
              onClick={() => setDeviceFrame('desktop')}
              className={cn(
                'p-1.5 rounded transition-colors',
                deviceFrame === 'desktop' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:bg-background/50'
              )}
              title="Desktop viewport"
              aria-label="Desktop viewport"
              aria-pressed={deviceFrame === 'desktop'}
            >
              <Monitor size={16} />
            </button>
            <button
              type="button"
              onClick={() => setDeviceFrame('tablet')}
              className={cn(
                'p-1.5 rounded transition-colors',
                deviceFrame === 'tablet' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:bg-background/50'
              )}
              title="Tablet viewport"
              aria-label="Tablet viewport"
              aria-pressed={deviceFrame === 'tablet'}
            >
              <Tablet size={16} />
            </button>
            <button
              type="button"
              onClick={() => setDeviceFrame('mobile')}
              className={cn(
                'p-1.5 rounded transition-colors',
                deviceFrame === 'mobile' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:bg-background/50'
              )}
              title="Mobile viewport"
              aria-label="Mobile viewport"
              aria-pressed={deviceFrame === 'mobile'}
            >
              <Smartphone size={16} />
            </button>
          </div>

          {/* Background Toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1" role="group" aria-label="Canvas background">
            <button
              type="button"
              onClick={() => setPreviewBackground('light')}
              className={cn(
                'p-1.5 rounded transition-colors',
                previewBackground === 'light' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:bg-background/50'
              )}
              title="Light background"
              aria-label="Light background"
              aria-pressed={previewBackground === 'light'}
            >
              <Sun size={16} />
            </button>
            <button
              type="button"
              onClick={() => setPreviewBackground('dark')}
              className={cn(
                'p-1.5 rounded transition-colors',
                previewBackground === 'dark' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:bg-background/50'
              )}
              title="Dark background"
              aria-label="Dark background"
              aria-pressed={previewBackground === 'dark'}
            >
              <Moon size={16} />
            </button>
            <button
              type="button"
              onClick={() => setPreviewBackground('checkered')}
              className={cn(
                'p-1.5 rounded transition-colors',
                previewBackground === 'checkered' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:bg-background/50'
              )}
              title="Checkered background"
              aria-label="Checkered background"
              aria-pressed={previewBackground === 'checkered'}
            >
              <Grid3X3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto">
        <div
          className={cn(
            'rounded-xl shadow-lg border border-border overflow-auto transition-all',
            deviceSizes[deviceFrame],
            backgroundClasses[previewBackground]
          )}
        >
          <div className="w-full min-h-full flex items-center justify-center p-6 md:p-8">
            {renderComponent()}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-card border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Customize properties in the inspector • Click component text to edit inline
        </p>
      </div>
    </div>
  );
};
