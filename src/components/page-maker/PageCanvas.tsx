import { useState } from 'react';
import { usePageStore } from '@/store/usePageStore';
import { ScopedCustomizationProvider, useCustomizationStore } from '@/store/useCustomizationStore';
import { ComponentRenderer } from '@/components/preview/ComponentRenderer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Monitor,
  Tablet,
  Smartphone,
  SlidersHorizontal,
  FolderTree,
  Download,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  GripVertical,
  Plus,
} from 'lucide-react';
import { downloadPageProjectZip } from '@/utils/pageExporter';
import { toast } from '@/hooks/use-toast';

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

interface PageCanvasProps {
  onOpenExport: () => void;
}

const quickStarters = [
  { label: 'Nav Bar', category: 'Navigation' },
  { label: 'Heading', category: 'Text & Typography' },
  { label: 'Basic Card', category: 'Cards & Containers' },
  { label: 'Standard Button', category: 'Buttons' },
];

export const PageCanvas = ({ onOpenExport }: PageCanvasProps) => {
  const {
    pageSettings,
    nodes,
    selectedNodeId,
    addNode,
    selectNode,
    updateNodeConfig,
    updateNodeStateStyles,
    setNodeActiveState,
    resetNodeConfig,
    moveNode,
    reorderNodes,
    duplicateNode,
    removeNode,
    updatePageSettings,
  } = usePageStore();
  const { selectedFramework } = useCustomizationStore();
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  const viewportWidths: Record<ViewportSize, string> = {
    desktop: 'w-full',
    tablet: 'w-[768px] max-w-full',
    mobile: 'w-[390px] max-w-full',
  };

  const handleQuickZipDownload = async () => {
    setIsZipping(true);
    try {
      const filename = await downloadPageProjectZip(pageSettings, nodes, selectedFramework);
      toast({
        title: 'Project exported',
        description: `Downloaded ${filename} with ${nodes.length} component module${nodes.length === 1 ? '' : 's'}.`,
      });
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-muted/30 min-w-0 min-h-0">
      {/* Top Workspace Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-card border-b border-border flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <Input
            value={pageSettings.name}
            onChange={(e) => updatePageSettings({ name: e.target.value })}
            aria-label="Page component name"
            className="h-8 w-44 text-xs font-mono"
            placeholder="LandingPage"
          />
          <Button
            type="button"
            variant={selectedNodeId === null ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => selectNode(null)}
            className="h-8 gap-1.5 text-xs"
          >
            <SlidersHorizontal size={13} />
            Page Settings
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div
            className="flex items-center gap-1 bg-muted rounded-lg p-1"
            role="group"
            aria-label="Canvas viewport size"
          >
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={cn(
                'p-1.5 rounded transition-colors',
                viewport === 'desktop'
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:bg-background/50'
              )}
              title="Desktop viewport"
              aria-label="Desktop viewport"
              aria-pressed={viewport === 'desktop'}
            >
              <Monitor size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              className={cn(
                'p-1.5 rounded transition-colors',
                viewport === 'tablet'
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:bg-background/50'
              )}
              title="Tablet viewport"
              aria-label="Tablet viewport"
              aria-pressed={viewport === 'tablet'}
            >
              <Tablet size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={cn(
                'p-1.5 rounded transition-colors',
                viewport === 'mobile'
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:bg-background/50'
              )}
              title="Mobile viewport"
              aria-label="Mobile viewport"
              aria-pressed={viewport === 'mobile'}
            >
              <Smartphone size={15} />
            </button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenExport}
            className="h-8 gap-1.5 text-xs"
          >
            <FolderTree size={14} />
            Export Project ({nodes.length})
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleQuickZipDownload}
            disabled={isZipping}
            className="h-8 gap-1.5 text-xs"
          >
            <Download size={14} />
            {isZipping ? 'Zipping...' : 'Download .ZIP'}
          </Button>
        </div>
      </div>

      {/* Interactive Blank/Composed Canvas */}
      <div
        className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start"
        onClick={() => selectNode(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'min-h-[600px] rounded-xl border border-border shadow-lg transition-all overflow-hidden',
            viewportWidths[viewport]
          )}
          style={{
            backgroundColor: pageSettings.backgroundColor || '#FFFFFF',
          }}
        >
          {nodes.length === 0 ? (
            <div className="min-h-[600px] flex flex-col items-center justify-center p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Plus size={26} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Blank Page Canvas
              </h2>
              <p className="text-sm text-gray-500 max-w-md mb-6">
                Import components or saved templates from the left panel, customize each instance independently, and export the linked page project with separate component files.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {quickStarters.map((starter) => (
                  <Button
                    key={starter.label}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addNode(starter.label, starter.category)}
                    className="gap-1.5"
                  >
                    <Plus size={13} />
                    Add {starter.label}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                maxWidth: `${pageSettings.maxWidth}px`,
                margin: '0 auto',
                padding: `${pageSettings.padding}px`,
                gap: `${pageSettings.gap}px`,
                display: pageSettings.layoutMode === 'grid' ? 'grid' : 'flex',
                flexDirection: pageSettings.layoutMode === 'stack' ? 'column' : undefined,
                gridTemplateColumns:
                  pageSettings.layoutMode === 'grid'
                    ? `repeat(${pageSettings.gridColumns}, minmax(0, 1fr))`
                    : undefined,
                alignItems: 'start',
              }}
            >
              {nodes.map((node, index) => {
                const isSelected = node.id === selectedNodeId;
                const justifyMap = {
                  start: 'flex-start',
                  center: 'center',
                  end: 'flex-end',
                  stretch: 'stretch',
                } as const;

                return (
                  <div
                    key={node.id}
                    draggable
                    onDragStart={() => setDragIndex(index)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDropIndex(index);
                    }}
                    onDragLeave={() => setDropIndex(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragIndex !== null && dragIndex !== index) {
                        reorderNodes(dragIndex, index);
                      }
                      setDragIndex(null);
                      setDropIndex(null);
                    }}
                    onDragEnd={() => {
                      setDragIndex(null);
                      setDropIndex(null);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectNode(node.id);
                    }}
                    style={{
                      gridColumn:
                        pageSettings.layoutMode === 'grid' && node.colSpan > 1
                          ? `span ${Math.min(node.colSpan, pageSettings.gridColumns)}`
                          : undefined,
                    }}
                    className={cn(
                      'group relative rounded-lg transition-all cursor-pointer p-2',
                      isSelected
                        ? 'ring-2 ring-primary bg-primary/[0.03]'
                        : 'hover:ring-1 hover:ring-primary/50',
                      dropIndex === index && dragIndex !== index && 'ring-2 ring-dashed ring-primary'
                    )}
                  >
                    {/* Node Control Strip */}
                    <div
                      className={cn(
                        'flex items-center justify-between gap-2 mb-2 px-2 py-1 rounded-md text-[11px] border transition-opacity',
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary opacity-100'
                          : 'bg-card/95 text-foreground border-border opacity-0 group-hover:opacity-100'
                      )}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <GripVertical size={12} className="shrink-0 cursor-grab" />
                        <span className="font-medium truncate">{node.name}</span>
                        <span className="opacity-75 truncate hidden sm:inline">
                          ({node.componentType})
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveNode(node.id, 'up');
                          }}
                          disabled={index === 0}
                          aria-label={`Move ${node.name} up`}
                          className="p-1 rounded hover:bg-black/10 disabled:opacity-30"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveNode(node.id, 'down');
                          }}
                          disabled={index === nodes.length - 1}
                          aria-label={`Move ${node.name} down`}
                          className="p-1 rounded hover:bg-black/10 disabled:opacity-30"
                        >
                          <ArrowDown size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateNode(node.id);
                          }}
                          aria-label={`Duplicate ${node.name}`}
                          className="p-1 rounded hover:bg-black/10"
                        >
                          <Copy size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNode(node.id);
                          }}
                          aria-label={`Delete ${node.name}`}
                          className="p-1 rounded hover:bg-black/10"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Scoped Independent Component Render */}
                    <div
                      className="flex w-full"
                      style={{ justifyContent: justifyMap[node.align] }}
                    >
                      <ScopedCustomizationProvider
                        componentType={node.componentType}
                        category={node.category}
                        config={node.config}
                        activeState={node.activeState}
                        onUpdateConfig={(updates) => updateNodeConfig(node.id, updates)}
                        onUpdateStateStyles={(stateName, updates) =>
                          updateNodeStateStyles(node.id, stateName, updates)
                        }
                        onSetActiveState={(state) => setNodeActiveState(node.id, state)}
                        onResetConfig={() => resetNodeConfig(node.id)}
                      >
                        <ComponentRenderer componentName={node.componentType} />
                      </ScopedCustomizationProvider>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
