import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { PreviewArea } from '@/components/PreviewArea';
import { CodeView } from '@/components/CodeView';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Switch } from '@/components/ui/switch';
import { Code, Eye } from 'lucide-react';

const Index = () => {
  const { showCodeView, toggleCodeView } = useCustomizationStore();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex overflow-hidden">
          <CustomizationPanel />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-center gap-3 py-4 bg-card border-b border-border">
              <Eye size={18} className={!showCodeView ? 'text-primary' : 'text-muted-foreground'} />
              <Switch checked={showCodeView} onCheckedChange={toggleCodeView} />
              <Code size={18} className={showCodeView ? 'text-primary' : 'text-muted-foreground'} />
              <span className="text-sm font-medium ml-2">
                {showCodeView ? 'Code View' : 'Preview'}
              </span>
            </div>
            
            {showCodeView ? <CodeView /> : <PreviewArea />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
