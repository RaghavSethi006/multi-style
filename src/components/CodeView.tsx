import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Download, Check } from 'lucide-react';
import { useState } from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import {
  generateReactCode,
  generateAngularCode,
  generateStreamlitCode,
  generateTkinterCode,
  generateWinUI3Code,
} from '@/utils/codeTemplates';
import { copyToClipboard, downloadFile } from '@/utils/download';
import { toast } from '@/hooks/use-toast';

export const CodeView = () => {
  const { componentConfig, selectedFramework, selectedComponent } = useCustomizationStore();
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
    switch (selectedFramework) {
      case 'react':
        return 'tsx';
      case 'angular':
        return 'ts';
      case 'streamlit':
      case 'tkinter':
        return 'py';
      case 'winui3':
        return 'xaml';
      default:
        return 'txt';
    }
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
    <div className="flex-1 flex flex-col bg-[#1E1E1E] text-white">
      <div className="flex items-center justify-between px-6 py-4 bg-[#252526] border-b border-[#3E3E42]">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold">Code Output</h3>
          <span className="px-2.5 py-1 bg-primary/20 text-primary rounded-md text-xs font-medium">
            {selectedFramework.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover rounded-lg transition-fast text-sm font-medium"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-hover rounded-lg transition-fast text-sm font-medium"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <SyntaxHighlighter
          language={getLanguage()}
          style={vscDarkPlus}
          customStyle={{
            background: 'transparent',
            padding: 0,
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.6',
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
