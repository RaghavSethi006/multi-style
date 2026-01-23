import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { PreviewArea } from '@/components/PreviewArea';
import { CodeView } from '@/components/CodeView';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Button } from '@/components/ui/button';
import { Code, X, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const { codeViewOpen, setCodeViewOpen } = useCustomizationStore();

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
            
            {/* Code View Toggle Button */}
            <Button
              onClick={() => setCodeViewOpen(!codeViewOpen)}
              variant="secondary"
              size="sm"
              className="absolute bottom-4 right-4 gap-2 shadow-lg"
            >
              <Code size={16} />
              {codeViewOpen ? 'Hide Code' : 'View Code'}
            </Button>
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
    </div>
  );
};

export default Index;
