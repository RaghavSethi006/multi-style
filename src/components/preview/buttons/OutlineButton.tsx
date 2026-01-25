import { useCustomizationStore } from '@/store/useCustomizationStore';
import * as icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const OutlineButton = () => {
  const { componentConfig, activeState } = useCustomizationStore();

  const IconComponent = componentConfig.buttonIcon 
    ? icons[componentConfig.buttonIcon as keyof typeof icons] as LucideIcon 
    : null;

  const getStateStyles = () => {
    if (activeState === 'default') return {};
    const stateStyle = componentConfig.stateStyles[activeState];
    const styles: React.CSSProperties = {};
    
    if (activeState === 'hover') {
      // Fill on hover
      styles.background = componentConfig.borderColor;
      styles.color = '#FFFFFF';
    }
    if (stateStyle.backgroundColor) styles.background = stateStyle.backgroundColor;
    if (stateStyle.textColor) styles.color = stateStyle.textColor;
    if (stateStyle.borderColor) styles.borderColor = stateStyle.borderColor;
    if (stateStyle.boxShadow) styles.boxShadow = stateStyle.boxShadow;
    return styles;
  };

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const boxShadow = `${componentConfig.boxShadowInset ? 'inset ' : ''}${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`;

  const buttonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${componentConfig.gap}px`,
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    fontStyle: componentConfig.fontStyle,
    letterSpacing: `${componentConfig.letterSpacing}px`,
    textTransform: componentConfig.textTransform,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
    background: 'transparent',
    color: componentConfig.textColor,
    border: `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
    borderRadius,
    boxShadow,
    opacity: componentConfig.opacity,
    cursor: 'pointer',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    width: componentConfig.buttonFullWidth ? '100%' : 'auto',
    ...getStateStyles(),
  };

  if (!componentConfig.visible) return null;

  return (
    <button style={buttonStyles}>
      {IconComponent && componentConfig.buttonIconPosition === 'left' && (
        <IconComponent size={componentConfig.fontSize} />
      )}
      <span>{componentConfig.text}</span>
      {IconComponent && componentConfig.buttonIconPosition === 'right' && (
        <IconComponent size={componentConfig.fontSize} />
      )}
    </button>
  );
};
