import { useMemo, useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePageStore } from '@/store/usePageStore';
import { Framework, useCustomizationStore } from '@/store/useCustomizationStore';
import { downloadPageProjectZip, generatePageProjectFiles } from '@/utils/pageExporter';
import { copyToClipboard, downloadFile } from '@/utils/download';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Check, Copy, Download, FileCode2, FolderOpen } from 'lucide-react';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('xml', markup);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('markdown', markdown);

const frameworks: { value: Framework; label: string }[] = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'streamlit', label: 'Streamlit' },
  { value: 'tkinter', label: 'Tkinter' },
  { value: 'winui3', label: 'WinUI 3' },
];

interface PageExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PageExportDialog = ({ open, onOpenChange }: PageExportDialogProps) => {
  const { pageSettings, nodes } = usePageStore();
  const { selectedFramework, setSelectedFramework } = useCustomizationStore();
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const project = useMemo(
    () => generatePageProjectFiles(pageSettings, nodes, selectedFramework),
    [pageSettings, nodes, selectedFramework]
  );

  const activeFile =
    project.files.find((f) => f.path === selectedPath) ??
    project.files.find((f) => f.path === project.entryFile) ??
    project.files[0];

  const groupedByFolder = useMemo(() => {
    const groups = new Map<string, typeof project.files>();
    for (const file of project.files) {
      const lastSlash = file.path.lastIndexOf('/');
      const folder = lastSlash >= 0 ? file.path.slice(0, lastSlash) : '(root)';
      const list = groups.get(folder) ?? [];
      list.push(file);
      groups.set(folder, list);
    }
    return Array.from(groups.entries());
  }, [project]);

  const handleCopyFile = async () => {
    if (!activeFile) return;
    const ok = await copyToClipboard(activeFile.content);
    if (ok) {
      setCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: `Copied ${activeFile.path}`,
      });
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleDownloadSingleFile = () => {
    if (!activeFile) return;
    const filename = activeFile.path.split('/').pop() || 'export.txt';
    downloadFile(activeFile.content, filename);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const filename = await downloadPageProjectZip(pageSettings, nodes, selectedFramework);
      toast({
        title: 'Project ZIP downloaded',
        description: `${filename} (${project.files.length} files)`,
      });
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[82vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center justify-between gap-4 pr-6 flex-wrap">
            <div>
              <DialogTitle>Export Page Project</DialogTitle>
              <DialogDescription>
                {project.files.length} files • Entry page <code>{project.entryFile}</code> linked to {nodes.length} component folder{nodes.length === 1 ? '' : 's'}
              </DialogDescription>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="gap-1.5"
            >
              <Download size={14} />
              {isZipping ? 'Building ZIP...' : 'Download Complete Project (.ZIP)'}
            </Button>
          </div>
        </DialogHeader>

        {/* Framework Selector */}
        <div
          role="tablist"
          aria-label="Export framework"
          className="flex items-center gap-1 px-5 py-2 bg-muted/40 border-b border-border overflow-x-auto shrink-0"
        >
          {frameworks.map((fw) => (
            <button
              key={fw.value}
              type="button"
              role="tab"
              aria-selected={selectedFramework === fw.value}
              onClick={() => {
                setSelectedFramework(fw.value);
                setSelectedPath('');
              }}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                selectedFramework === fw.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {fw.label}
            </button>
          ))}
        </div>

        {/* Folder Tree + Code Viewer */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Folder/File Tree */}
          <div className="w-72 border-r border-border bg-card flex flex-col shrink-0">
            <div className="px-3 py-2 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {project.rootFolder}/
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-3">
                {groupedByFolder.map(([folder, files]) => (
                  <div key={folder} className="space-y-0.5">
                    <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-muted-foreground">
                      <FolderOpen size={12} className="shrink-0" />
                      <span className="truncate">{folder}</span>
                    </div>
                    {files.map((file) => {
                      const fileName = file.path.split('/').pop() || file.path;
                      const isActive = activeFile?.path === file.path;
                      const isEntry = file.path === project.entryFile;
                      return (
                        <button
                          key={file.path}
                          type="button"
                          onClick={() => setSelectedPath(file.path)}
                          className={cn(
                            'w-full flex items-center justify-between gap-2 pl-6 pr-2 py-1.5 rounded text-xs font-mono text-left transition-colors',
                            isActive
                              ? 'bg-primary/15 text-primary font-medium'
                              : 'text-foreground hover:bg-muted'
                          )}
                        >
                          <span className="flex items-center gap-1.5 min-w-0">
                            <FileCode2 size={13} className="shrink-0" />
                            <span className="truncate">{fileName}</span>
                          </span>
                          {isEntry && (
                            <span className="px-1.5 py-0.5 text-[10px] rounded bg-primary/10 text-primary shrink-0">
                              page
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Code Pane */}
          <div className="flex-1 flex flex-col bg-[#1E1E1E] min-w-0 overflow-hidden">
            {activeFile && (
              <>
                <div className="flex items-center justify-between gap-2 px-4 py-2 bg-[#252526] border-b border-[#3E3E42] shrink-0">
                  <span className="text-xs font-mono text-gray-300 truncate">
                    {activeFile.path}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={handleCopyFile}
                      className="h-7 px-2.5 text-xs gap-1.5"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleDownloadSingleFile}
                      className="h-7 px-2.5 text-xs gap-1.5 bg-[#3E3E42] text-white border-[#4E4E52] hover:bg-[#4E4E52]"
                    >
                      <Download size={13} />
                      File
                    </Button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <SyntaxHighlighter
                    language={activeFile.language}
                    style={vscDarkPlus}
                    customStyle={{
                      background: 'transparent',
                      padding: 0,
                      margin: 0,
                      fontSize: '13px',
                      lineHeight: '1.5',
                    }}
                    showLineNumbers
                  >
                    {activeFile.content}
                  </SyntaxHighlighter>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
