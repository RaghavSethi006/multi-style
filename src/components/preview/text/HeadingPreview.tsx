import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useState, useRef, useEffect } from 'react';

export const HeadingPreview = () => {
  const { componentConfig, activeState, updateComponentConfig } = useCustomizationStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(componentConfig.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(componentConfig.text);
  }, [componentConfig.text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const getStateStyles = () => {
    if (activeState === 'default') return {};
    const stateStyle = componentConfig.stateStyles[activeState];
    const styles: React.CSSProperties = {};
    if (stateStyle.textColor) styles.color = stateStyle.textColor;
    return styles;
  };

  const headingSizes: Record<number, number> = {
    1: 48,
    2: 36,
    3: 30,
    4: 24,
    5: 20,
    6: 16,
  };

  const headingStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${headingSizes[componentConfig.headingLevel] || componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    fontStyle: componentConfig.fontStyle,
    lineHeight: componentConfig.lineHeight,
    letterSpacing: `${componentConfig.letterSpacing}px`,
    textAlign: componentConfig.textAlign,
    textDecoration: componentConfig.textDecoration,
    textTransform: componentConfig.textTransform,
    color: componentConfig.textColor,
    margin: 0,
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
    if (e.key === 'Enter') {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setEditValue(componentConfig.text);
      setIsEditing(false);
    }
  };

  if (!componentConfig.visible) return null;

  const HeadingTag = `h${componentConfig.headingLevel}` as keyof JSX.IntrinsicElements;

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          ...headingStyles,
          border: '2px solid hsl(var(--primary))',
          borderRadius: '4px',
          padding: '4px 8px',
          background: 'transparent',
          outline: 'none',
          width: '100%',
          minWidth: '200px',
        }}
      />
    );
  }

  return (
    <HeadingTag 
      style={headingStyles} 
      onClick={handleClick}
      title="Click to edit"
    >
      {componentConfig.text}
    </HeadingTag>
  );
};
