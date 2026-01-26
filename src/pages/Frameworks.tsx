import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useTemplateStore, CustomFramework, SavedTemplate } from '@/store/useTemplateStore';
import { cn } from '@/lib/utils';
import {
  Package, Plus, Download, Upload, Trash2, Edit2,
  FileJson, Check, X, ChevronDown, FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { MiniPreview } from '@/components/catalog/MiniPreview';

const Frameworks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    frameworks,
    templates,
    createFramework,
    updateFramework,
    deleteFramework,
    exportFramework,
    importFramework,
    addTemplatesToFramework,
    removeTemplateFromFramework,
    getTemplateById,
  } = useTemplateStore();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addTemplatesDialogOpen, setAddTemplatesDialogOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<CustomFramework | null>(null);
  const [expandedFramework, setExpandedFramework] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    version: '1.0.0',
    author: '',
  });
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);

  const resetForm = () => {
    setFormData({ name: '', description: '', version: '1.0.0', author: '' });
    setSelectedTemplateIds([]);
  };

  const handleCreate = () => {
    if (!formData.name.trim()) return;
    
    createFramework({
      name: formData.name.trim(),
      description: formData.description.trim(),
      version: formData.version.trim() || '1.0.0',
      author: formData.author.trim(),
      templates: selectedTemplateIds,
    });
    
    setCreateDialogOpen(false);
    resetForm();
    toast({ title: 'Framework created', description: `"${formData.name}" has been created.` });
  };

  const handleUpdate = () => {
    if (!selectedFramework || !formData.name.trim()) return;
    
    updateFramework(selectedFramework.id, {
      name: formData.name.trim(),
      description: formData.description.trim(),
      version: formData.version.trim(),
      author: formData.author.trim(),
    });
    
    setEditDialogOpen(false);
    setSelectedFramework(null);
    resetForm();
    toast({ title: 'Framework updated' });
  };

  const handleDelete = () => {
    if (!selectedFramework) return;
    
    deleteFramework(selectedFramework.id);
    setDeleteDialogOpen(false);
    setSelectedFramework(null);
    toast({ title: 'Framework deleted' });
  };

  const handleExport = (framework: CustomFramework) => {
    const jsonData = exportFramework(framework.id);
    if (!jsonData) return;
    
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${framework.name.toLowerCase().replace(/\s+/g, '-')}-framework.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({ title: 'Framework exported', description: 'Download started.' });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const result = importFramework(content);
      
      if (result.success) {
        toast({ title: 'Framework imported', description: result.message });
      } else {
        toast({ title: 'Import failed', description: result.message, variant: 'destructive' });
      }
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddTemplates = () => {
    if (!selectedFramework) return;
    
    addTemplatesToFramework(selectedFramework.id, selectedTemplateIds);
    setAddTemplatesDialogOpen(false);
    setSelectedFramework(null);
    setSelectedTemplateIds([]);
    toast({ title: 'Templates added' });
  };

  const openEditDialog = (framework: CustomFramework) => {
    setSelectedFramework(framework);
    setFormData({
      name: framework.name,
      description: framework.description,
      version: framework.version,
      author: framework.author,
    });
    setEditDialogOpen(true);
  };

  const openAddTemplatesDialog = (framework: CustomFramework) => {
    setSelectedFramework(framework);
    setSelectedTemplateIds([]);
    setAddTemplatesDialogOpen(true);
  };

  const toggleTemplateSelection = (templateId: string) => {
    setSelectedTemplateIds((prev) =>
      prev.includes(templateId)
        ? prev.filter((id) => id !== templateId)
        : [...prev, templateId]
    );
  };

  const availableTemplatesForFramework = (framework: CustomFramework) => {
    return templates.filter((t) => !framework.templates.includes(t.id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Package className="text-primary" size={28} />
                Custom Frameworks
              </h1>
              <p className="text-muted-foreground mt-1">
                Group templates into reusable design systems
              </p>
            </div>
            <div className="flex gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="gap-2"
              >
                <Upload size={16} />
                Import
              </Button>
              <Button
                onClick={() => {
                  resetForm();
                  setSelectedTemplateIds([]);
                  setCreateDialogOpen(true);
                }}
                className="gap-2"
              >
                <Plus size={16} />
                Create Framework
              </Button>
            </div>
          </div>

          {/* Frameworks List */}
          {frameworks.length > 0 ? (
            <div className="space-y-4">
              {frameworks.map((framework) => {
                const frameworkTemplates = framework.templates
                  .map((id) => getTemplateById(id))
                  .filter(Boolean) as SavedTemplate[];
                const isExpanded = expandedFramework === framework.id;

                return (
                  <Collapsible
                    key={framework.id}
                    open={isExpanded}
                    onOpenChange={() =>
                      setExpandedFramework(isExpanded ? null : framework.id)
                    }
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        {/* Framework Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                          <CollapsibleTrigger className="flex items-center gap-3 flex-1 text-left">
                            <ChevronDown
                              size={18}
                              className={cn(
                                'text-muted-foreground transition-transform',
                                isExpanded && 'rotate-180'
                              )}
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{framework.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                v{framework.version} • {frameworkTemplates.length} template{frameworkTemplates.length !== 1 ? 's' : ''}
                                {framework.author && ` • By ${framework.author}`}
                              </p>
                            </div>
                          </CollapsibleTrigger>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => openAddTemplatesDialog(framework)}
                              size="sm"
                              variant="outline"
                              className="gap-1"
                            >
                              <Plus size={14} />
                              Add Templates
                            </Button>
                            <Button
                              onClick={() => handleExport(framework)}
                              size="sm"
                              variant="outline"
                              className="gap-1"
                            >
                              <Download size={14} />
                              Export
                            </Button>
                            <Button
                              onClick={() => openEditDialog(framework)}
                              size="sm"
                              variant="outline"
                              className="px-2"
                            >
                              <Edit2 size={14} />
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectedFramework(framework);
                                setDeleteDialogOpen(true);
                              }}
                              size="sm"
                              variant="outline"
                              className="px-2 text-destructive"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>

                        {/* Framework Templates */}
                        <CollapsibleContent>
                          <div className="p-4">
                            {framework.description && (
                              <p className="text-sm text-muted-foreground mb-4">
                                {framework.description}
                              </p>
                            )}

                            {frameworkTemplates.length > 0 ? (
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {frameworkTemplates.map((template) => (
                                  <div
                                    key={template.id}
                                    className="relative group p-3 border border-border rounded-lg bg-background"
                                  >
                                    <button
                                      onClick={() =>
                                        removeTemplateFromFramework(framework.id, template.id)
                                      }
                                      className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X size={12} />
                                    </button>
                                    <div className="h-16 flex items-center justify-center mb-2">
                                      <MiniPreview componentName={template.componentType} />
                                    </div>
                                    <p className="text-xs font-medium truncate">{template.name}</p>
                                    <p className="text-xs text-muted-foreground">{template.componentType}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground text-center py-8">
                                No templates in this framework yet. Add some to get started.
                              </p>
                            )}
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Card>
                  </Collapsible>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <FolderOpen size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No frameworks yet</h3>
              <p className="text-muted-foreground mb-6">
                Create a framework to group your saved templates into a reusable design system.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="gap-2"
                >
                  <Upload size={16} />
                  Import Framework
                </Button>
                <Button
                  onClick={() => {
                    resetForm();
                    setCreateDialogOpen(true);
                  }}
                  className="gap-2"
                >
                  <Plus size={16} />
                  Create Framework
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Framework Dialog */}
      <Dialog open={createDialogOpen || editDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setCreateDialogOpen(false);
          setEditDialogOpen(false);
          setSelectedFramework(null);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editDialogOpen ? 'Edit Framework' : 'Create New Framework'}
            </DialogTitle>
            <DialogDescription>
              {editDialogOpen
                ? 'Update your framework details.'
                : 'Create a new framework to group your templates.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="My UI Kit"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A collection of components for..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Version</label>
                <Input
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="1.0.0"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Author</label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Your name"
                />
              </div>
            </div>

            {createDialogOpen && templates.length > 0 && (
              <div>
                <label className="text-sm font-medium">Include Templates</label>
                <div className="mt-2 max-h-48 overflow-y-auto border border-border rounded-lg p-2 space-y-2">
                  {templates.map((template) => (
                    <label
                      key={template.id}
                      className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedTemplateIds.includes(template.id)}
                        onCheckedChange={() => toggleTemplateSelection(template.id)}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.componentType}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCreateDialogOpen(false);
                setEditDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={editDialogOpen ? handleUpdate : handleCreate}>
              {editDialogOpen ? 'Save Changes' : 'Create Framework'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Templates Dialog */}
      <Dialog open={addTemplatesDialogOpen} onOpenChange={setAddTemplatesDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Templates to {selectedFramework?.name}</DialogTitle>
            <DialogDescription>Select templates to add to this framework.</DialogDescription>
          </DialogHeader>

          {selectedFramework && (
            <div className="max-h-64 overflow-y-auto border border-border rounded-lg p-2 space-y-2">
              {availableTemplatesForFramework(selectedFramework).length > 0 ? (
                availableTemplatesForFramework(selectedFramework).map((template) => (
                  <label
                    key={template.id}
                    className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedTemplateIds.includes(template.id)}
                      onCheckedChange={() => toggleTemplateSelection(template.id)}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.componentType}</p>
                    </div>
                  </label>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  All templates are already in this framework.
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddTemplatesDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTemplates} disabled={selectedTemplateIds.length === 0}>
              Add Selected ({selectedTemplateIds.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Framework?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{selectedFramework?.name}". Templates will not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Frameworks;
