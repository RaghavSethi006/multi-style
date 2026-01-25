import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Quote } from 'lucide-react';

export const BlockquotePreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();

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
      <p style={{ margin: 0, marginBottom: componentConfig.blockquoteAuthor ? '12px' : 0 }}>
        "{componentConfig.text}"
      </p>
      {componentConfig.blockquoteAuthor && (
        <footer style={{ 
          fontSize: `${componentConfig.fontSize * 0.875}px`, 
          opacity: 0.7,
          fontStyle: 'normal',
        }}>
          — {componentConfig.blockquoteAuthor}
        </footer>
      )}
    </blockquote>
  );
};
