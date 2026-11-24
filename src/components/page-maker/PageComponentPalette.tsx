import { useMemo, useState } from 'react';
import { categories } from '@/data/categories';
import { usePageStore } from '@/store/usePageStore';
import { useTemplateStore } from '@/store/useTemplateStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  Layers,
  Bookmark,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  X,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const PageComponentPalette = () => {
  const { nodes, selectedNodeId, addNode, importTemplate, selectNode, moveNode, duplicateNode, removeNode, clearCanvas } =
    usePageStore();
  const { templates } = useTemplateStore();
  const [search, setSearch] = useState('');
  const [openCategories, setOpenCategories] = useState<string[]>([
    'buttons',
    'text',
    'forms',
    'cards',
  ]);

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        components: cat.components.filter(
          (c) =>
            c.available &&
            (!query ||
              c.name.toLowerCase().includes(query) ||
              cat.name.toLowerCase().includes(query))
        ),
      }))
      .filter((cat) => cat.components.length > 0);
  }, [search]);

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return templates;
    return templates.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.componentType.toLowerCase().includes(query) ||
        t.componentCategory.toLowerCase().includes(query)
    );
  }, [templates, search]);

  const handleAddComponent = (name: string, category: string) => {
    addNode(name, category);
    toast({
      title: 'Component added',
      description: `Added ${name} to the page canvas.`,
    });
  };

  const handleImportTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;
    importTemplate(template);
    toast({
      title: 'Template imported',
      description: `Inserted "${template.name}" onto the page canvas.`,
    });
  };

  return (
    <aside className="w-72 bg-card border-r border-border h-full flex flex-col shrink-0">
      <Tabs defaultValue="add" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0 h-auto">
          <TabsTrigger
            value="add"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2.5 text-xs font-medium gap-1.5"
          >
            <Plus size={14} />
            Components
          </TabsTrigger>
          <TabsTrigger
            value="layers"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2.5 text-xs font-medium gap-1.5"
          >
            <Layers size={14} />
            Layers ({nodes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="flex-1 flex flex-col overflow-hidden mt-0">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components or templates..."
                aria-label="Search components to import"
                className="pl-8 pr-7 h-8 text-xs"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear component search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-4">
              {filteredTemplates.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-1 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <Bookmark size={12} />
                    <span>Saved Templates ({filteredTemplates.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredTemplates.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => handleImportTemplate(template.id)}
                        className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-left text-xs bg-primary/5 hover:bg-primary/10 border border-primary/15 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="font-medium text-foreground truncate">
                            {template.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground truncate">
                            {template.componentType}
                          </div>
                        </div>
                        <Plus size={14} className="text-primary shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                {filteredCategories.map((cat) => {
                  const isExpanded = search.trim().length > 0 || openCategories.includes(cat.id);
                  return (
                    <div key={cat.id} className="rounded-lg border border-border/60 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        aria-expanded={isExpanded}
                        className="w-full flex items-center justify-between px-2.5 py-2 text-xs font-semibold bg-muted/40 hover:bg-muted transition-colors"
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                          {cat.components.length}
                          {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="p-1.5 space-y-0.5 bg-background">
                          {cat.components.map((comp) => (
                            <button
                              key={comp.id}
                              type="button"
                              onClick={() => handleAddComponent(comp.name, cat.name)}
                              className="w-full flex items-center justify-between px-2 py-1.5 rounded text-xs text-foreground hover:bg-muted transition-colors group"
                            >
                              <span className="truncate">{comp.name}</span>
                              <span className="inline-flex items-center gap-0.5 text-[11px] text-primary opacity-70 group-hover:opacity-100">
                                <Plus size={13} />
                                Add
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="layers" className="flex-1 flex flex-col overflow-hidden mt-0">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {nodes.length === 0 ? 'Canvas is empty' : `${nodes.length} page element${nodes.length === 1 ? '' : 's'}`}
            </span>
            {nodes.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCanvas}
                className="h-7 px-2 text-xs text-destructive hover:text-destructive"
              >
                Clear All
              </Button>
            )}
          </div>

          <ScrollArea className="flex-1">
            {nodes.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No components added yet. Switch to the Components tab to import elements onto the page.
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {nodes.map((node, index) => {
                  const isSelected = node.id === selectedNodeId;
                  return (
                    <div
                      key={node.id}
                      onClick={() => selectNode(node.id)}
                      className={cn(
                        'p-2 rounded-lg border text-xs cursor-pointer transition-colors',
                        isSelected
                          ? 'bg-primary/10 border-primary/40'
                          : 'bg-background border-border/60 hover:bg-muted/50'
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-medium truncate">{node.name}</div>
                          <div className="text-[11px] text-muted-foreground truncate">
                            {node.componentType}
                          </div>
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
                            className="p-1 rounded hover:bg-background disabled:opacity-30"
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
                            className="p-1 rounded hover:bg-background disabled:opacity-30"
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
                            className="p-1 rounded hover:bg-background"
                          >
                            <Copy size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNode(node.id);
                            }}
                            aria-label={`Remove ${node.name}`}
                            className="p-1 rounded hover:bg-destructive/10 text-destructive"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </aside>
  );
};
