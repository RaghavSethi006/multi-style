import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { PreviewArea } from '@/components/PreviewArea';
import { CodeView } from '@/components/CodeView';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTemplateStore } from '@/store/useTemplateStore';
import { Button } from '@/components/ui/button';
import { Code, X, Save, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
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
import { categories } from '@/data/categories';

const Playground = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { codeViewOpen, setCodeViewOpen, selectedComponent, selectedCategory, componentConfig } = useCustomizationStore();
  const { saveTemplate } = useTemplateStore();
  
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;
    
    saveTemplate({
      name: templateName.trim(),
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
      description: `"${templateName}" has been saved to your templates.`,
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
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Component Sidebar */}
        <Sidebar />
        
        {/* Center: Property Inspector + Preview */}
        <div className="flex-1 flex overflow-hidden">
          {/* Property Inspector (Left Panel) */}
          <CustomizationPanel />
          
          {/* Preview Area (Center) */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <PreviewArea />
            
            {/* Action Buttons */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                size="sm"
                className="gap-2 shadow-lg bg-background"
              >
                <Home size={16} />
                Catalog
              </Button>
              <Button
                onClick={openSaveDialog}
                variant="secondary"
                size="sm"
                className="gap-2 shadow-lg"
              >
                <Save size={16} />
                Save Template
              </Button>
              <Button
                onClick={() => setCodeViewOpen(!codeViewOpen)}
                variant="secondary"
                size="sm"
                className="gap-2 shadow-lg"
              >
                <Code size={16} />
                {codeViewOpen ? 'Hide Code' : 'View Code'}
              </Button>
            </div>
          </div>
          
          {/* Code View (Right Panel - Collapsible) */}
          <div
            className={cn(
              'bg-[#1E1E1E] border-l border-border transition-all duration-300 overflow-hidden',
              codeViewOpen ? 'w-[480px]' : 'w-0'
            )}
          >
            {codeViewOpen && (
              <div className="w-[480px] h-full flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#3E3E42]">
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-primary" />
                    <span className="text-sm font-medium text-white">Code Output</span>
                  </div>
                  <button
                    onClick={() => setCodeViewOpen(false)}
                    className="p-1 rounded hover:bg-[#3E3E42] text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <CodeView />
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
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Template Name *</label>
              <Input
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="My Custom Button"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description (optional)</label>
              <Textarea
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="A blue gradient button with rounded corners..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate} disabled={!templateName.trim()}>
              <Save size={16} className="mr-2" />
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Playground;
