import { usePageStore, NodeAlignment } from '@/store/usePageStore';
import { ScopedCustomizationProvider } from '@/store/useCustomizationStore';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toColorPickerValue } from '@/lib/styleUtils';
import { toKebabCase, toPascalCase } from '@/utils/codeTemplates';
import { RotateCcw, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PageInspector = () => {
  const {
    pageSettings,
    nodes,
    selectedNodeId,
    selectNode,
    updateNodeConfig,
    updateNodeStateStyles,
    setNodeActiveState,
    resetNodeConfig,
    updateNodeMeta,
    updatePageSettings,
    resetPageSettings,
  } = usePageStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-card border-l border-border h-full flex flex-col shrink-0">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="text-sm font-semibold flex items-center gap-1.5">
              <SlidersHorizontal size={14} />
              Page Settings
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Layout & export shell
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={resetPageSettings}
            className="gap-1.5 h-8"
          >
            <RotateCcw size={13} />
            Reset
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-5">
            <div>
              <Label htmlFor="page-comp-name" className="text-xs font-medium">
                Page File / Symbol Name
              </Label>
              <Input
                id="page-comp-name"
                value={pageSettings.name}
                onChange={(e) => updatePageSettings({ name: e.target.value })}
                className="mt-1.5 font-mono text-xs"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Exports as <code>src/pages/{toPascalCase(pageSettings.name || 'CustomPage')}.tsx</code>
              </p>
            </div>

            <div>
              <Label htmlFor="page-title" className="text-xs font-medium">
                Page Title
              </Label>
              <Input
                id="page-title"
                value={pageSettings.title}
                onChange={(e) => updatePageSettings({ title: e.target.value })}
                className="mt-1.5 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="page-bg" className="text-xs font-medium">
                Canvas Background
              </Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  type="color"
                  aria-label="Page background color picker"
                  value={toColorPickerValue(pageSettings.backgroundColor, '#FFFFFF')}
                  onChange={(e) => updatePageSettings({ backgroundColor: e.target.value })}
                  className="w-12 h-9 p-1 cursor-pointer"
                />
                <Input
                  id="page-bg"
                  value={pageSettings.backgroundColor}
                  onChange={(e) => updatePageSettings({ backgroundColor: e.target.value })}
                  className="flex-1 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium">Layout Mode</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {(['stack', 'grid'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => updatePageSettings({ layoutMode: mode })}
                    className={cn(
                      'px-3 py-2 text-xs font-medium rounded-lg border capitalize transition-colors',
                      pageSettings.layoutMode === mode
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background border-border hover:bg-muted'
                    )}
                  >
                    {mode === 'stack' ? 'Vertical Stack' : 'Responsive Grid'}
                  </button>
                ))}
              </div>
            </div>

            {pageSettings.layoutMode === 'grid' && (
              <div>
                <Label className="text-xs font-medium">Grid Columns</Label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {([1, 2, 3] as const).map((cols) => (
                    <button
                      key={cols}
                      type="button"
                      onClick={() => updatePageSettings({ gridColumns: cols })}
                      className={cn(
                        'py-1.5 text-xs font-medium rounded-lg border transition-colors',
                        pageSettings.gridColumns === cols
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-border hover:bg-muted'
                      )}
                    >
                      {cols} Col{cols > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between mb-1.5">
                <Label className="text-xs font-medium">Container Max Width</Label>
                <span className="text-xs text-muted-foreground">{pageSettings.maxWidth}px</span>
              </div>
              <Slider
                value={[pageSettings.maxWidth]}
                onValueChange={([v]) => updatePageSettings({ maxWidth: v })}
                min={480}
                max={1440}
                step={20}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <Label className="text-xs font-medium">Page Padding</Label>
                <span className="text-xs text-muted-foreground">{pageSettings.padding}px</span>
              </div>
              <Slider
                value={[pageSettings.padding]}
                onValueChange={([v]) => updatePageSettings({ padding: v })}
                min={0}
                max={96}
                step={4}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <Label className="text-xs font-medium">Element Gap</Label>
                <span className="text-xs text-muted-foreground">{pageSettings.gap}px</span>
              </div>
              <Slider
                value={[pageSettings.gap]}
                onValueChange={([v]) => updatePageSettings({ gap: v })}
                min={0}
                max={64}
                step={4}
              />
            </div>
          </div>
        </ScrollArea>
      </aside>
    );
  }

  const kebabSlug = toKebabCase(selectedNode.name || selectedNode.componentType);
  const pascalSymbol = toPascalCase(selectedNode.name || selectedNode.componentType);

  return (
    <aside className="w-80 bg-card border-l border-border h-full flex flex-col shrink-0 overflow-hidden">
      {/* Node Placement & Export Filename Controls */}
      <div className="p-3 border-b border-border bg-muted/20 space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => selectNode(null)}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={13} />
            Page Settings
          </button>
          <span className="text-[11px] font-mono text-muted-foreground truncate max-w-[160px]">
            components/{kebabSlug}/{pascalSymbol}
          </span>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="node-export-name" className="text-[11px] font-medium">
            Component Instance Name
          </Label>
          <Input
            id="node-export-name"
            value={selectedNode.name}
            onChange={(e) => updateNodeMeta(selectedNode.id, { name: e.target.value })}
            className="h-8 text-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-[11px] font-medium">Align</Label>
            <select
              aria-label="Node alignment"
              value={selectedNode.align}
              onChange={(e) =>
                updateNodeMeta(selectedNode.id, { align: e.target.value as NodeAlignment })
              }
              className="mt-1 w-full h-8 px-2 rounded-md border border-input bg-background text-xs"
            >
              <option value="stretch">Stretch</option>
              <option value="start">Left</option>
              <option value="center">Center</option>
              <option value="end">Right</option>
            </select>
          </div>

          {pageSettings.layoutMode === 'grid' && (
            <div>
              <Label className="text-[11px] font-medium">Grid Span</Label>
              <select
                aria-label="Node column span"
                value={selectedNode.colSpan}
                onChange={(e) =>
                  updateNodeMeta(selectedNode.id, {
                    colSpan: Number(e.target.value) as 1 | 2 | 3,
                  })
                }
                className="mt-1 w-full h-8 px-2 rounded-md border border-input bg-background text-xs"
              >
                <option value={1}>1 Column</option>
                {pageSettings.gridColumns >= 2 && <option value={2}>2 Columns</option>}
                {pageSettings.gridColumns >= 3 && <option value={3}>3 Columns</option>}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Full 6-Tab Component Customizer Bound to This Node */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScopedCustomizationProvider
          componentType={selectedNode.componentType}
          category={selectedNode.category}
          config={selectedNode.config}
          activeState={selectedNode.activeState}
          onUpdateConfig={(updates) => updateNodeConfig(selectedNode.id, updates)}
          onUpdateStateStyles={(stateName, updates) =>
            updateNodeStateStyles(selectedNode.id, stateName, updates)
          }
          onSetActiveState={(state) => setNodeActiveState(selectedNode.id, state)}
          onResetConfig={() => resetNodeConfig(selectedNode.id)}
        >
          <CustomizationPanel className="w-full border-r-0 h-full" />
        </ScopedCustomizationProvider>
      </div>
    </aside>
  );
};
