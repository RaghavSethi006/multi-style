import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useState, useRef, useEffect } from 'react';

export const ParagraphPreview = () => {
  const { componentConfig, activeState, updateComponentConfig } = useCustomizationStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(componentConfig.text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(componentConfig.text);
  }, [componentConfig.text]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const getStateStyles = () => {
    if (activeState === 'default') return {};
    const stateStyle = componentConfig.stateStyles[activeState];
    const styles: React.CSSProperties = {};
    if (stateStyle.textColor) styles.color = stateStyle.textColor;
    return styles;
  };

  const paragraphStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    fontStyle: componentConfig.fontStyle,
    lineHeight: componentConfig.lineHeight,
    letterSpacing: `${componentConfig.letterSpacing}px`,
    textAlign: componentConfig.textAlign,
    textDecoration: componentConfig.textDecoration,
    textTransform: componentConfig.textTransform,
    color: componentConfig.textColor,
    margin: 0,
    maxWidth: '600px',
    opacity: componentConfig.opacity,
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    cursor: 'text',
    ...getStateStyles(),
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== componentConfig.text) {
      updateComponentConfig({ text: editValue });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditValue(componentConfig.text);
      setIsEditing(false);
    }
  };

  if (!componentConfig.visible) return null;

  if (isEditing) {
    return (
      <textarea
        ref={textareaRef}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        rows={4}
        style={{
          ...paragraphStyles,
          border: '2px solid hsl(var(--primary))',
          borderRadius: '4px',
          padding: '8px',
          background: 'transparent',
          outline: 'none',
          width: '100%',
          resize: 'vertical',
        }}
      />
    );
  }

  return (
    <p style={paragraphStyles} onClick={handleClick} title="Click to edit">
      {componentConfig.text}
    </p>
  );
};
