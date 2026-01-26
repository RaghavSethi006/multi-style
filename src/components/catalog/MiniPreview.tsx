import { cn } from '@/lib/utils';
import { 
  Check, Star, Search, ChevronRight, Bell, User, Settings,
  Image as ImageIcon, Play, GripVertical, Menu, Home
} from 'lucide-react';

interface MiniPreviewProps {
  componentName: string;
}

// Mini previews are static, simplified representations of each component
export const MiniPreview = ({ componentName }: MiniPreviewProps) => {
  const renderPreview = () => {
    switch (componentName) {
      // BUTTONS
      case 'Standard Button':
        return (
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium shadow-sm">
            Click Me
          </button>
        );
      case 'Icon Button':
        return (
          <button className="p-2.5 bg-primary text-primary-foreground rounded-lg shadow-sm">
            <Star size={18} />
          </button>
        );
      case 'FAB Button':
        return (
          <button className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg">
            <span className="text-lg">+</span>
          </button>
        );
      case 'Outline Button':
        return (
          <button className="px-4 py-2 border-2 border-primary text-primary rounded-lg text-sm font-medium">
            Outline
          </button>
        );
      case 'Toggle Button':
        return (
          <div className="flex gap-1">
            <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-l-lg text-xs">On</button>
            <button className="px-3 py-1.5 bg-muted text-muted-foreground rounded-r-lg text-xs">Off</button>
          </div>
        );

      // TEXT
      case 'Heading':
        return <h2 className="text-xl font-bold text-foreground">Heading Text</h2>;
      case 'Paragraph':
        return <p className="text-sm text-muted-foreground max-w-32 text-center">Sample paragraph text here...</p>;
      case 'Label':
        return <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Label</span>;
      case 'Blockquote':
        return (
          <blockquote className="border-l-4 border-primary pl-3 text-sm italic text-muted-foreground">
            Quote text...
          </blockquote>
        );
      case 'Code Block':
        return (
          <code className="px-3 py-2 bg-muted rounded text-xs font-mono text-foreground">
            {'const x = 1;'}
          </code>
        );

      // INPUTS
      case 'Text Field':
        return (
          <div className="w-32">
            <input 
              type="text" 
              placeholder="Enter text..." 
              className="w-full px-3 py-1.5 border border-border rounded-md text-xs bg-background"
              readOnly
            />
          </div>
        );
      case 'Text Area':
        return (
          <div className="w-32 h-12 border border-border rounded-md bg-background p-2">
            <div className="text-xs text-muted-foreground">Text area...</div>
          </div>
        );
      case 'Password Input':
        return (
          <div className="w-32 px-3 py-1.5 border border-border rounded-md bg-background flex items-center gap-2">
            <span className="text-xs tracking-widest">••••••</span>
          </div>
        );
      case 'Search Field':
        return (
          <div className="w-32 px-3 py-1.5 border border-border rounded-md bg-background flex items-center gap-2">
            <Search size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Search...</span>
          </div>
        );
      case 'Number Input':
        return (
          <div className="flex items-center border border-border rounded-md bg-background overflow-hidden">
            <span className="px-2 py-1 text-xs">−</span>
            <span className="px-3 py-1 text-xs border-x border-border">42</span>
            <span className="px-2 py-1 text-xs">+</span>
          </div>
        );
      case 'File Upload':
        return (
          <div className="w-32 p-3 border-2 border-dashed border-border rounded-lg text-center">
            <div className="text-xs text-muted-foreground">Drop files</div>
          </div>
        );
      case 'Color Picker':
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary shadow-sm" />
            <span className="text-xs text-muted-foreground">#3B82F6</span>
          </div>
        );
      case 'Range Slider':
        return (
          <div className="w-32">
            <div className="h-1.5 bg-muted rounded-full">
              <div className="w-1/2 h-full bg-primary rounded-full" />
            </div>
          </div>
        );

      // SELECTORS
      case 'Checkbox':
        return (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
              <Check size={10} className="text-primary-foreground" />
            </div>
            <span className="text-xs">Checked</span>
          </div>
        );
      case 'Radio Group':
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-4 border-primary" />
              <span className="text-xs">Option 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-border" />
              <span className="text-xs text-muted-foreground">Option 2</span>
            </div>
          </div>
        );
      case 'Switch':
        return (
          <div className="w-10 h-5 bg-primary rounded-full p-0.5 flex justify-end">
            <div className="w-4 h-4 bg-primary-foreground rounded-full shadow" />
          </div>
        );
      case 'Dropdown':
        return (
          <div className="w-28 px-3 py-1.5 border border-border rounded-md bg-background flex items-center justify-between">
            <span className="text-xs">Select...</span>
            <ChevronRight size={12} className="rotate-90 text-muted-foreground" />
          </div>
        );
      case 'Autocomplete':
        return (
          <div className="w-28 px-3 py-1.5 border border-border rounded-md bg-background flex items-center gap-2">
            <Search size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Type to search</span>
          </div>
        );

      // NAVIGATION
      case 'Nav Bar':
        return (
          <div className="flex items-center gap-3 px-3 py-2 bg-card rounded-lg border border-border">
            <Home size={14} className="text-primary" />
            <span className="text-xs">About</span>
            <span className="text-xs text-muted-foreground">Contact</span>
          </div>
        );
      case 'Tabs':
        return (
          <div className="flex border-b border-border">
            <div className="px-3 py-1.5 text-xs font-medium text-primary border-b-2 border-primary">Tab 1</div>
            <div className="px-3 py-1.5 text-xs text-muted-foreground">Tab 2</div>
            <div className="px-3 py-1.5 text-xs text-muted-foreground">Tab 3</div>
          </div>
        );
      case 'Breadcrumbs':
        return (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-muted-foreground">Home</span>
            <ChevronRight size={12} className="text-muted-foreground" />
            <span className="text-muted-foreground">Products</span>
            <ChevronRight size={12} className="text-muted-foreground" />
            <span className="text-foreground">Item</span>
          </div>
        );
      case 'Pagination':
        return (
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 flex items-center justify-center text-xs text-muted-foreground">«</span>
            <span className="w-6 h-6 flex items-center justify-center text-xs bg-primary text-primary-foreground rounded">1</span>
            <span className="w-6 h-6 flex items-center justify-center text-xs">2</span>
            <span className="w-6 h-6 flex items-center justify-center text-xs">3</span>
            <span className="w-6 h-6 flex items-center justify-center text-xs text-muted-foreground">»</span>
          </div>
        );
      case 'Stepper':
        return (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">✓</div>
            <div className="w-6 h-0.5 bg-primary" />
            <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">2</div>
            <div className="w-6 h-0.5 bg-muted" />
            <div className="w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">3</div>
          </div>
        );

      // CARDS
      case 'Basic Card':
        return (
          <div className="w-28 p-3 bg-card rounded-lg border border-border shadow-sm">
            <div className="text-xs font-medium mb-1">Card Title</div>
            <div className="text-xs text-muted-foreground">Content...</div>
          </div>
        );
      case 'Image Card':
        return (
          <div className="w-28 bg-card rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="h-12 bg-muted flex items-center justify-center">
              <ImageIcon size={16} className="text-muted-foreground" />
            </div>
            <div className="p-2">
              <div className="text-xs font-medium">Image Card</div>
            </div>
          </div>
        );
      case 'Profile Card':
        return (
          <div className="w-28 p-3 bg-card rounded-lg border border-border shadow-sm text-center">
            <div className="w-8 h-8 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-2">
              <User size={14} className="text-primary" />
            </div>
            <div className="text-xs font-medium">John Doe</div>
          </div>
        );
      case 'Accordion':
        return (
          <div className="w-32 border border-border rounded-lg overflow-hidden">
            <div className="px-3 py-2 bg-muted/50 flex items-center justify-between">
              <span className="text-xs font-medium">Section 1</span>
              <ChevronRight size={12} className="rotate-90" />
            </div>
            <div className="px-3 py-2 text-xs text-muted-foreground">Content...</div>
          </div>
        );

      // FEEDBACK
      case 'Alert':
        return (
          <div className="w-36 px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center gap-2">
            <Bell size={12} className="text-blue-500" />
            <span className="text-xs text-foreground">Info alert</span>
          </div>
        );
      case 'Toast':
        return (
          <div className="w-32 px-3 py-2 bg-card rounded-lg shadow-lg border border-border">
            <div className="text-xs font-medium">Success!</div>
            <div className="text-xs text-muted-foreground">Done.</div>
          </div>
        );
      case 'Badge':
        return (
          <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs font-medium">
            New
          </span>
        );
      case 'Progress Bar':
        return (
          <div className="w-32">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-primary rounded-full" />
            </div>
          </div>
        );
      case 'Skeleton':
        return (
          <div className="space-y-2 w-28">
            <div className="h-3 bg-muted rounded animate-pulse" />
            <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
          </div>
        );
      case 'Tooltip':
        return (
          <div className="relative">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background rounded text-xs whitespace-nowrap">
              Tooltip
            </div>
            <button className="px-3 py-1.5 bg-muted rounded text-xs">Hover me</button>
          </div>
        );
      case 'Modal':
        return (
          <div className="w-32 p-3 bg-card rounded-lg shadow-xl border border-border">
            <div className="text-xs font-medium mb-1">Modal Title</div>
            <div className="text-xs text-muted-foreground">Content...</div>
          </div>
        );

      // LISTS
      case 'Simple List':
        return (
          <ul className="text-xs space-y-1">
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground rounded-full" />Item 1</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground rounded-full" />Item 2</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground rounded-full" />Item 3</li>
          </ul>
        );
      case 'Icon List':
        return (
          <ul className="text-xs space-y-1">
            <li className="flex items-center gap-2"><Check size={10} className="text-green-500" />Feature 1</li>
            <li className="flex items-center gap-2"><Check size={10} className="text-green-500" />Feature 2</li>
          </ul>
        );
      case 'Checkbox List':
        return (
          <ul className="text-xs space-y-1">
            <li className="flex items-center gap-2">
              <div className="w-3 h-3 border border-border rounded" />Task 1
            </li>
            <li className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded flex items-center justify-center">
                <Check size={8} className="text-primary-foreground" />
              </div>
              <span className="line-through text-muted-foreground">Task 2</span>
            </li>
          </ul>
        );
      case 'Ordered List':
        return (
          <ol className="text-xs space-y-1">
            <li className="flex items-center gap-2"><span className="text-muted-foreground">1.</span>Step one</li>
            <li className="flex items-center gap-2"><span className="text-muted-foreground">2.</span>Step two</li>
          </ol>
        );

      // DATA DISPLAY
      case 'Table':
        return (
          <div className="text-xs border border-border rounded overflow-hidden">
            <div className="flex bg-muted/50">
              <div className="px-2 py-1 w-12 font-medium">Name</div>
              <div className="px-2 py-1 w-12 font-medium">Role</div>
            </div>
            <div className="flex border-t border-border">
              <div className="px-2 py-1 w-12">John</div>
              <div className="px-2 py-1 w-12">Admin</div>
            </div>
          </div>
        );
      case 'Grid':
        return (
          <div className="grid grid-cols-3 gap-1">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="w-4 h-4 bg-muted rounded" />
            ))}
          </div>
        );
      case 'Timeline':
        return (
          <div className="flex items-start gap-2">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <div className="w-0.5 h-4 bg-muted" />
            </div>
            <div className="text-xs">Event 1</div>
          </div>
        );
      case 'Carousel':
        return (
          <div className="flex items-center gap-2">
            <ChevronRight size={14} className="rotate-180 text-muted-foreground" />
            <div className="w-16 h-10 bg-muted rounded flex items-center justify-center text-xs">Slide</div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </div>
        );

      // MEDIA
      case 'Image':
        return (
          <div className="w-20 h-14 bg-muted rounded-lg flex items-center justify-center">
            <ImageIcon size={20} className="text-muted-foreground" />
          </div>
        );
      case 'Avatar':
        return (
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
            JD
          </div>
        );
      case 'Icon':
        return <Star size={24} className="text-primary" />;
      case 'Chart':
        return (
          <div className="flex items-end gap-1 h-10">
            {[40, 70, 50, 90, 60].map((h, i) => (
              <div key={i} className="w-3 bg-primary rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
        );

      // ADVANCED
      case 'Drag & Drop':
        return (
          <div className="w-28 p-2 border-2 border-dashed border-border rounded-lg flex items-center gap-2">
            <GripVertical size={12} className="text-muted-foreground" />
            <span className="text-xs">Drag item</span>
          </div>
        );
      case 'Split Pane':
        return (
          <div className="flex w-28 h-10 border border-border rounded overflow-hidden">
            <div className="flex-1 bg-muted/30 flex items-center justify-center text-xs">Left</div>
            <div className="w-1 bg-border cursor-col-resize" />
            <div className="flex-1 bg-muted/30 flex items-center justify-center text-xs">Right</div>
          </div>
        );
      case 'Code Editor':
        return (
          <div className="w-32 p-2 bg-zinc-900 rounded text-xs font-mono">
            <div className="text-blue-400">const</div>
            <div className="text-green-400">x = 1;</div>
          </div>
        );

      default:
        return (
          <div className="text-xs text-muted-foreground italic">
            {componentName}
          </div>
        );
    }
  };

  return (
    <div className="scale-90">
      {renderPreview()}
    </div>
  );
};
