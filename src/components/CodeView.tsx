import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Download, Check } from 'lucide-react';
import { useState } from 'react';
import { useCustomizationStore, Framework } from '@/store/useCustomizationStore';
import {
  generateReactCode,
  generateAngularCode,
  generateStreamlitCode,
  generateTkinterCode,
  generateWinUI3Code,
} from '@/utils/codeTemplates';
import { copyToClipboard, downloadFile } from '@/utils/download';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const frameworks: { value: Framework; label: string; ext: string }[] = [
  { value: 'react', label: 'React', ext: 'tsx' },
  { value: 'angular', label: 'Angular', ext: 'ts' },
  { value: 'streamlit', label: 'Streamlit', ext: 'py' },
  { value: 'tkinter', label: 'Tkinter', ext: 'py' },
  { value: 'winui3', label: 'WinUI3', ext: 'xaml' },
];

export const CodeView = () => {
  const { componentConfig, selectedFramework, setSelectedFramework } = useCustomizationStore();
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (selectedFramework) {
      case 'react':
        return generateReactCode(componentConfig);
      case 'angular':
        return generateAngularCode(componentConfig);
      case 'streamlit':
        return generateStreamlitCode(componentConfig);
      case 'tkinter':
        return generateTkinterCode(componentConfig);
      case 'winui3':
        return generateWinUI3Code(componentConfig);
      default:
        return '';
    }
  };

  const getLanguage = () => {
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
  };

  const getFileExtension = () => {
    return frameworks.find(f => f.value === selectedFramework)?.ext || 'txt';
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(getCode());
    if (success) {
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Code copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const filename = `component.${getFileExtension()}`;
    downloadFile(getCode(), filename);
    toast({
      title: 'Downloaded!',
      description: `File saved as ${filename}`,
    });
  };

  const code = getCode();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Framework Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 bg-[#252526] border-b border-[#3E3E42] overflow-x-auto">
        {frameworks.map((fw) => (
          <button
            key={fw.value}
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
      <div className="flex items-center gap-2 px-4 py-2 bg-[#2D2D2D] border-b border-[#3E3E42]">
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

      {/* Code */}
      <div className="flex-1 overflow-auto p-4">
        <SyntaxHighlighter
          language={getLanguage()}
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
