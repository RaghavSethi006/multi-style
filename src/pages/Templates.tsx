import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useTemplateStore, SavedTemplate } from '@/store/useTemplateStore';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import {
  Bookmark, Copy, Edit2, Trash2, ArrowRight,
  Search, Plus, FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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
import { MiniPreview } from '@/components/catalog/MiniPreview';
import { useToast } from '@/hooks/use-toast';

const Templates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { templates, deleteTemplate, duplicateTemplate, updateTemplate } = useTemplateStore();
  const { loadTemplate } = useCustomizationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<SavedTemplate | null>(null);
  const [newName, setNewName] = useState('');

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(trimmedQuery) ||
      t.componentType.toLowerCase().includes(trimmedQuery) ||
      t.componentCategory.toLowerCase().includes(trimmedQuery)
  );

  const handleLoadTemplate = (template: SavedTemplate) => {
    loadTemplate(template.componentType, template.componentCategory, template.config);
    navigate('/playground');
  };

  const handleDuplicate = (template: SavedTemplate) => {
    duplicateTemplate(template.id);
    toast({ title: 'Template duplicated', description: `Created a copy of "${template.name}".` });
  };

  const handleRename = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (selectedTemplate && newName.trim()) {
      updateTemplate(selectedTemplate.id, { name: newName.trim() });
      toast({ title: 'Template renamed', description: `Renamed to "${newName.trim()}".` });
      setRenameDialogOpen(false);
      setSelectedTemplate(null);
      setNewName('');
    }
  };

  const handleDelete = () => {
    if (selectedTemplate) {
      deleteTemplate(selectedTemplate.id);
      toast({ title: 'Template deleted' });
      setDeleteDialogOpen(false);
      setSelectedTemplate(null);
    }
  };

  const openRenameDialog = (template: SavedTemplate) => {
    setSelectedTemplate(template);
    setNewName(template.name);
    setRenameDialogOpen(true);
  };

  const openDeleteDialog = (template: SavedTemplate) => {
    setSelectedTemplate(template);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Bookmark className="text-primary" size={28} />
                Saved Templates
              </h1>
              <p className="text-muted-foreground mt-1">
                Your saved component configurations
              </p>
            </div>
            <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
              <Plus size={16} />
              Browse Components
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search templates..."
              aria-label="Search saved templates"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Templates Grid */}
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="group overflow-hidden hover:shadow-lg transition-all">
                  {/* Preview */}
                  <div className="h-28 bg-muted/30 flex items-center justify-center border-b border-border relative">
                    <MiniPreview componentName={template.componentType} />
                    {template.config?.backgroundColor && (
                      <span
                        title={`Primary color: ${template.config.backgroundColor}`}
                        className="absolute bottom-2 right-2 w-4 h-4 rounded-full border border-border shadow-sm"
                        style={{ backgroundColor: template.config.backgroundColor }}
                      />
                    )}
                  </div>

                  <CardContent className="p-4">
                    {/* Category Badge */}
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-secondary text-secondary-foreground mb-2">
                      {template.componentCategory}
                    </span>

                    {/* Template Name */}
                    <h3 className="text-base font-semibold text-foreground truncate">{template.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {template.componentType} • {new Date(template.updatedAt).toLocaleDateString()}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleLoadTemplate(template)}
                        size="sm"
                        className="flex-1 gap-1"
                      >
                        Load <ArrowRight size={12} />
                      </Button>
                      <Button
                        onClick={() => handleDuplicate(template)}
                        size="sm"
                        variant="outline"
                        className="px-2"
                        aria-label={`Duplicate ${template.name}`}
                        title="Duplicate template"
                      >
                        <Copy size={14} />
                      </Button>
                      <Button
                        onClick={() => openRenameDialog(template)}
                        size="sm"
                        variant="outline"
                        className="px-2"
                        aria-label={`Rename ${template.name}`}
                        title="Rename template"
                      >
                        <Edit2 size={14} />
                      </Button>
                      <Button
                        onClick={() => openDeleteDialog(template)}
                        size="sm"
                        variant="outline"
                        className="px-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        aria-label={`Delete ${template.name}`}
                        title="Delete template"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : templates.length > 0 ? (
            <div className="text-center py-16 space-y-3">
              <Search size={40} className="mx-auto text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">No matching templates</h3>
              <p className="text-muted-foreground text-sm">
                No saved templates match "{searchQuery}".
              </p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className="text-center py-16">
              <FolderOpen size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No templates yet</h3>
              <p className="text-muted-foreground mb-6">
                Customize a component and save it as a template to reuse later.
              </p>
              <Button onClick={() => navigate('/')} className="gap-2">
                <Plus size={16} />
                Browse Components
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Template</DialogTitle>
            <DialogDescription>Enter a new name for this template.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRename} className="space-y-4">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Template name"
              aria-label="New template name"
              autoFocus
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRenameDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!newName.trim()}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{selectedTemplate?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Templates;
