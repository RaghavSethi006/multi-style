import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { PreviewArea } from '@/components/PreviewArea';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTemplateStore } from '@/store/useTemplateStore';
import { Button } from '@/components/ui/button';
import { Code, X, Save, Home, Layers, SlidersHorizontal, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const CodeView = lazy(() =>
  import('@/components/CodeView').then((m) => ({ default: m.CodeView }))
);

type MobileTab = 'components' | 'customize' | 'preview' | 'code';

const Playground = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    codeViewOpen,
    setCodeViewOpen,
    selectedComponent,
    selectedCategory,
    componentConfig,
  } = useCustomizationStore();
  const { saveTemplate } = useTemplateStore();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [mobileTab, setMobileTab] = useState<MobileTab>('preview');

  const handleSaveTemplate = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedName = templateName.trim();
    if (!trimmedName) return;

    saveTemplate({
      name: trimmedName,
      description: templateDescription.trim(),
      componentType: selectedComponent,
      componentCategory: selectedCategory,
      config: componentConfig,
    });

    setSaveDialogOpen(false);
    setTemplateName('');
    setTemplateDescription('');
    toast({
      title: 'Template saved',
      description: `"${trimmedName}" has been saved to your templates.`,
    });
  };

  const openSaveDialog = () => {
    setTemplateName(`My ${selectedComponent}`);
    setTemplateDescription('');
    setSaveDialogOpen(true);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />

      {/* Mobile Workspace Switcher (< lg) */}
      <div
        role="tablist"
        aria-label="Workspace panels"
        className="lg:hidden flex items-center border-b border-border bg-card px-2 py-1.5 gap-1 shrink-0"
      >
        {(
          [
            { id: 'components', label: 'Components', icon: Layers },
            { id: 'customize', label: 'Customize', icon: SlidersHorizontal },
            { id: 'preview', label: 'Preview', icon: Eye },
            { id: 'code', label: 'Code', icon: Code },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = mobileTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMobileTab(tab.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-md text-xs font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left: Component Sidebar */}
        <div
          className={cn(
            'lg:block h-full shrink-0',
            mobileTab === 'components' ? 'block w-full lg:w-auto' : 'hidden'
          )}
        >
          <Sidebar
            className="w-full lg:w-64"
            onSelectComponent={() => setMobileTab('preview')}
          />
        </div>

        {/* Center + Right: Property Inspector + Preview + Code */}
        <div className="flex-1 flex overflow-hidden min-w-0 min-h-0">
          {/* Property Inspector */}
          <div
            className={cn(
              'lg:block h-full shrink-0',
              mobileTab === 'customize' ? 'block w-full lg:w-auto' : 'hidden'
            )}
          >
            <CustomizationPanel className="w-full lg:w-80" />
          </div>

          {/* Preview Area */}
          <div
            className={cn(
              'flex-1 flex-col overflow-hidden min-w-0 min-h-0',
              mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'
            )}
          >
            {/* Non-overlapping Action Bar */}
            <div className="flex items-center justify-between gap-2 px-4 py-2 bg-card border-b border-border shrink-0 flex-wrap">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 h-8"
                >
                  <Home size={14} />
                  <span>Catalog</span>
                </Button>
                <span className="hidden sm:inline text-xs text-muted-foreground">
                  {selectedCategory} / <strong className="text-foreground">{selectedComponent}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={openSaveDialog}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 h-8"
                >
                  <Save size={14} />
                  <span>Save Template</span>
                </Button>
                <Button
                  onClick={() => setCodeViewOpen(!codeViewOpen)}
                  variant={codeViewOpen ? 'default' : 'secondary'}
                  size="sm"
                  className="hidden lg:inline-flex gap-1.5 h-8"
                >
                  <Code size={14} />
                  <span>{codeViewOpen ? 'Hide Code' : 'View Code'}</span>
                </Button>
              </div>
            </div>

            <PreviewArea />
          </div>

          {/* Code View (Right Panel on Desktop, Dedicated Tab on Mobile) */}
          <div
            className={cn(
              'bg-[#1E1E1E] border-l border-border transition-all duration-300 overflow-hidden shrink-0',
              mobileTab === 'code'
                ? 'flex w-full lg:w-[480px] flex-col'
                : cn('hidden lg:flex lg:flex-col', codeViewOpen ? 'lg:w-[480px]' : 'lg:w-0 lg:border-l-0')
            )}
          >
            {(codeViewOpen || mobileTab === 'code') && (
              <div className="w-full lg:w-[480px] h-full flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#3E3E42]">
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-primary" />
                    <span className="text-sm font-medium text-white">Code Output</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCodeViewOpen(false);
                      if (mobileTab === 'code') setMobileTab('preview');
                    }}
                    aria-label="Close code view"
                    className="p-1 rounded hover:bg-[#3E3E42] text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <Suspense
                  fallback={
                    <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                      Loading code viewer...
                    </div>
                  }
                >
                  <CodeView />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Template Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save as Template</DialogTitle>
            <DialogDescription>
              Save your current {selectedComponent} configuration as a reusable template.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveTemplate} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="save-template-name" className="text-sm font-medium">
                Template Name *
              </label>
              <Input
                id="save-template-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="My Custom Button"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="save-template-desc" className="text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                id="save-template-desc"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="A blue gradient button with rounded corners..."
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setSaveDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!templateName.trim()}>
                <Save size={16} className="mr-2" />
                Save Template
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Playground;
