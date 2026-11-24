import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { RotateCcw, Palette, Type, Move, Sparkles, Zap, Settings } from 'lucide-react';
import { AppearancePanel } from './customization/AppearancePanel';
import { TypographyPanel } from './customization/TypographyPanel';
import { SizeLayoutPanel } from './customization/SizeLayoutPanel';
import { EffectsPanel } from './customization/EffectsPanel';
import { StatesPanel } from './customization/StatesPanel';
import { ComponentSpecificPanel } from './customization/ComponentSpecificPanel';

import { cn } from '@/lib/utils';

interface CustomizationPanelProps {
  className?: string;
}

export const CustomizationPanel = ({ className }: CustomizationPanelProps) => {
  const { selectedComponent, resetComponentConfig } = useCustomizationStore();

  return (
    <div className={cn('w-80 bg-card border-r border-border h-full flex flex-col shrink-0', className)}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold">Property Inspector</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{selectedComponent}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetComponentConfig}
          className="gap-1.5 h-8"
        >
          <RotateCcw size={14} />
          Reset
        </Button>
      </div>

      <Tabs defaultValue="appearance" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 h-auto flex-wrap">
          <TabsTrigger 
            value="appearance" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 py-2 text-xs gap-1.5"
          >
            <Palette size={14} />
            Style
          </TabsTrigger>
          <TabsTrigger 
            value="typography" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 py-2 text-xs gap-1.5"
          >
            <Type size={14} />
            Text
          </TabsTrigger>
          <TabsTrigger 
            value="layout" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 py-2 text-xs gap-1.5"
          >
            <Move size={14} />
            Size
          </TabsTrigger>
          <TabsTrigger 
            value="effects" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 py-2 text-xs gap-1.5"
          >
            <Sparkles size={14} />
            FX
          </TabsTrigger>
          <TabsTrigger 
            value="states" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 py-2 text-xs gap-1.5"
          >
            <Zap size={14} />
            States
          </TabsTrigger>
          <TabsTrigger 
            value="component" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-3 py-2 text-xs gap-1.5"
          >
            <Settings size={14} />
            Options
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="appearance" className="mt-0">
              <AppearancePanel />
            </TabsContent>
            <TabsContent value="typography" className="mt-0">
              <TypographyPanel />
            </TabsContent>
            <TabsContent value="layout" className="mt-0">
              <SizeLayoutPanel />
            </TabsContent>
            <TabsContent value="effects" className="mt-0">
              <EffectsPanel />
            </TabsContent>
            <TabsContent value="states" className="mt-0">
              <StatesPanel />
            </TabsContent>
            <TabsContent value="component" className="mt-0">
              <ComponentSpecificPanel />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
};
