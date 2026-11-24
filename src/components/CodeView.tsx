import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Download, Check } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useCustomizationStore, Framework } from '@/store/useCustomizationStore';
import { generateComponentCode, getSuggestedFileName } from '@/utils/codeTemplates';
import { copyToClipboard, downloadFile } from '@/utils/download';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('xml', markup);

const frameworks: { value: Framework; label: string }[] = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'streamlit', label: 'Streamlit' },
  { value: 'tkinter', label: 'Tkinter' },
  { value: 'winui3', label: 'WinUI 3' },
];

export const CodeView = () => {
  const { componentConfig, selectedFramework, setSelectedFramework, selectedComponent } =
    useCustomizationStore();
  const [copied, setCopied] = useState(false);

  const code = useMemo(
    () => generateComponentCode(selectedFramework, componentConfig, selectedComponent),
    [selectedFramework, componentConfig, selectedComponent]
  );

  const language = useMemo(() => {
    switch (selectedFramework) {
      case 'react':
        return 'tsx';
      case 'angular':
        return 'typescript';
      case 'streamlit':
      case 'tkinter':
        return 'python';
      case 'winui3':
        return 'xml';
      default:
        return 'typescript';
    }
  }, [selectedFramework]);

  const filename = getSuggestedFileName(selectedComponent, selectedFramework);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: `${selectedComponent} (${selectedFramework}) code copied.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({
        title: 'Copy failed',
        description: 'Clipboard access was blocked. Try downloading the file instead.',
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    downloadFile(code, filename);
    toast({
      title: 'Download started',
      description: `Saved as ${filename}`,
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Framework Tabs */}
      <div
        role="tablist"
        aria-label="Target export framework"
        className="flex items-center gap-1 px-4 py-2 bg-[#252526] border-b border-[#3E3E42] overflow-x-auto"
      >
        {frameworks.map((fw) => (
          <button
            key={fw.value}
            role="tab"
            aria-selected={selectedFramework === fw.value}
            onClick={() => setSelectedFramework(fw.value)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap',
              selectedFramework === fw.value
                ? 'bg-primary text-primary-foreground'
                : 'text-gray-400 hover:text-white hover:bg-[#3E3E42]'
            )}
          >
            {fw.label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 bg-[#2D2D2D] border-b border-[#3E3E42]">
        <span className="text-xs font-mono text-gray-400 truncate">{filename}</span>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#3E3E42] hover:bg-[#4E4E52] text-white rounded transition-colors"
          >
            <Download size={14} />
            Download
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto p-4">
        <SyntaxHighlighter
          language={language}
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
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
