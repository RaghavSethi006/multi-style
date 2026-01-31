import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Copy, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export const CodeBlockPreview = () => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(componentConfig.codeContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(componentConfig.codeContent);
  }, [componentConfig.codeContent]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

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

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== componentConfig.codeContent) {
      updateComponentConfig({ codeContent: editValue });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditValue(componentConfig.codeContent);
      setIsEditing(false);
    }
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
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          rows={8}
          style={{
            ...codeBlockStyles,
            margin: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            border: '2px solid hsl(var(--primary))',
            outline: 'none',
            resize: 'vertical',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      ) : (
        <pre 
          style={{ ...codeBlockStyles, margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, cursor: 'text' }}
          onClick={() => setIsEditing(true)}
          title="Click to edit code"
        >
          <code>{componentConfig.codeContent}</code>
        </pre>
      )}
    </div>
  );
};
