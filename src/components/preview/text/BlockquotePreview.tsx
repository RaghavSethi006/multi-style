import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Quote } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export const BlockquotePreview = () => {
  const { componentConfig, activeState, updateComponentConfig } = useCustomizationStore();
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingAuthor, setIsEditingAuthor] = useState(false);
  const [editText, setEditText] = useState(componentConfig.text);
  const [editAuthor, setEditAuthor] = useState(componentConfig.blockquoteAuthor || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditText(componentConfig.text);
    setEditAuthor(componentConfig.blockquoteAuthor || '');
  }, [componentConfig.text, componentConfig.blockquoteAuthor]);

  useEffect(() => {
    if (isEditingText && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditingText]);

  useEffect(() => {
    if (isEditingAuthor && authorRef.current) {
      authorRef.current.focus();
      authorRef.current.select();
    }
  }, [isEditingAuthor]);

  const getStateStyles = () => {
    if (activeState === 'default') return {};
    const stateStyle = componentConfig.stateStyles[activeState];
    const styles: React.CSSProperties = {};
    if (stateStyle.backgroundColor) styles.background = stateStyle.backgroundColor;
    if (stateStyle.textColor) styles.color = stateStyle.textColor;
    if (stateStyle.borderColor) styles.borderColor = stateStyle.borderColor;
    return styles;
  };

  const blockquoteStyles: React.CSSProperties = {
    position: 'relative',
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    fontStyle: componentConfig.fontStyle,
    lineHeight: componentConfig.lineHeight,
    letterSpacing: `${componentConfig.letterSpacing}px`,
    textAlign: componentConfig.textAlign,
    color: componentConfig.textColor,
    background: componentConfig.backgroundColor,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
    margin: 0,
    borderLeft: `${componentConfig.borderWidth}px solid ${componentConfig.borderColor}`,
    opacity: componentConfig.opacity,
    maxWidth: '600px',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    ...getStateStyles(),
  };

  const handleTextBlur = () => {
    setIsEditingText(false);
    if (editText !== componentConfig.text) {
      updateComponentConfig({ text: editText });
    }
  };

  const handleAuthorBlur = () => {
    setIsEditingAuthor(false);
    if (editAuthor !== componentConfig.blockquoteAuthor) {
      updateComponentConfig({ blockquoteAuthor: editAuthor });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'text' | 'author') => {
    if (e.key === 'Escape') {
      if (type === 'text') {
        setEditText(componentConfig.text);
        setIsEditingText(false);
      } else {
        setEditAuthor(componentConfig.blockquoteAuthor || '');
        setIsEditingAuthor(false);
      }
    }
    if (e.key === 'Enter' && type === 'author') {
      handleAuthorBlur();
    }
  };

  if (!componentConfig.visible) return null;

  return (
    <blockquote style={blockquoteStyles}>
      <Quote 
        size={24} 
        style={{ 
          position: 'absolute', 
          top: '8px', 
          right: '16px', 
          opacity: 0.2,
          color: componentConfig.borderColor,
        }} 
      />
      {isEditingText ? (
        <textarea
          ref={textareaRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleTextBlur}
          onKeyDown={(e) => handleKeyDown(e, 'text')}
          rows={3}
          style={{
            margin: 0,
            marginBottom: componentConfig.blockquoteAuthor ? '12px' : 0,
            border: '2px solid hsl(var(--primary))',
            borderRadius: '4px',
            padding: '4px 8px',
            background: 'transparent',
            outline: 'none',
            width: '100%',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            color: 'inherit',
            resize: 'vertical',
          }}
        />
      ) : (
        <p 
          style={{ margin: 0, marginBottom: componentConfig.blockquoteAuthor ? '12px' : 0, cursor: 'text' }}
          onClick={() => setIsEditingText(true)}
          title="Click to edit"
        >
          "{componentConfig.text}"
        </p>
      )}
      {componentConfig.blockquoteAuthor && (
        isEditingAuthor ? (
          <input
            ref={authorRef}
            type="text"
            value={editAuthor}
            onChange={(e) => setEditAuthor(e.target.value)}
            onBlur={handleAuthorBlur}
            onKeyDown={(e) => handleKeyDown(e, 'author')}
            style={{
              fontSize: `${componentConfig.fontSize * 0.875}px`,
              opacity: 0.7,
              fontStyle: 'normal',
              border: '2px solid hsl(var(--primary))',
              borderRadius: '4px',
              padding: '2px 6px',
              background: 'transparent',
              outline: 'none',
              color: 'inherit',
              minWidth: '100px',
            }}
          />
        ) : (
          <footer 
            style={{ 
              fontSize: `${componentConfig.fontSize * 0.875}px`, 
              opacity: 0.7,
              fontStyle: 'normal',
              cursor: 'text',
            }}
            onClick={() => setIsEditingAuthor(true)}
            title="Click to edit author"
          >
            — {componentConfig.blockquoteAuthor}
          </footer>
        )
      )}
    </blockquote>
  );
};
