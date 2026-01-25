import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const CodeBlockPreview = () => {
  const { componentConfig } = useCustomizationStore();
  const [copied, setCopied] = useState(false);

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const codeBlockStyles: React.CSSProperties = {
    position: 'relative',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
    fontSize: `${componentConfig.fontSize}px`,
    lineHeight: componentConfig.lineHeight,
    color: componentConfig.textColor,
    background: componentConfig.backgroundColor,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
    borderRadius,
    overflow: 'auto',
    width: '100%',
    maxWidth: '600px',
    opacity: componentConfig.opacity,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(componentConfig.codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!componentConfig.visible) return null;

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        background: 'rgba(255,255,255,0.05)',
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: componentConfig.backgroundColor,
      }}>
        <span style={{ 
          fontSize: '12px', 
          color: componentConfig.textColor, 
          opacity: 0.6,
          textTransform: 'uppercase',
        }}>
          {componentConfig.codeLanguage}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '4px',
            color: componentConfig.textColor,
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre style={{ ...codeBlockStyles, margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        <code>{componentConfig.codeContent}</code>
      </pre>
    </div>
  );
};
