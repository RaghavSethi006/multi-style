import { useCustomizationStore } from '@/store/useCustomizationStore';
import * as icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const StandardButton = () => {
  const { componentConfig } = useCustomizationStore();

  const IconComponent = componentConfig.buttonIcon 
    ? icons[componentConfig.buttonIcon as keyof typeof icons] as LucideIcon 
    : null;

  // Compute box shadow from individual properties
  const boxShadow = componentConfig.boxShadowInset
    ? `inset ${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`
    : `${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`;

  // Compute background (gradient or solid)
  const background = componentConfig.useGradient
    ? componentConfig.gradientType === 'linear'
      ? `linear-gradient(${componentConfig.gradientAngle}deg, ${componentConfig.gradientStart}, ${componentConfig.gradientEnd})`
      : `radial-gradient(circle, ${componentConfig.gradientStart}, ${componentConfig.gradientEnd})`
    : componentConfig.backgroundColor;

  // Glassmorphism effect
  const glassmorphismStyles = componentConfig.glassmorphism
    ? {
        backdropFilter: `blur(${componentConfig.glassBlur}px)`,
        WebkitBackdropFilter: `blur(${componentConfig.glassBlur}px)`,
        backgroundColor: `rgba(255, 255, 255, ${componentConfig.glassOpacity})`,
      }
    : {};

  return (
    <button
      className="transition-all inline-flex items-center justify-center"
      style={{
        fontFamily: componentConfig.fontFamily,
        fontSize: `${componentConfig.fontSize}px`,
        fontWeight: componentConfig.fontWeight,
        fontStyle: componentConfig.fontStyle,
        lineHeight: componentConfig.lineHeight,
        letterSpacing: `${componentConfig.letterSpacing}px`,
        textAlign: componentConfig.textAlign,
        textDecoration: componentConfig.textDecoration,
        textTransform: componentConfig.textTransform,
        background: componentConfig.glassmorphism ? undefined : background,
        backgroundColor: componentConfig.glassmorphism ? `rgba(255, 255, 255, ${componentConfig.glassOpacity})` : undefined,
        color: componentConfig.textColor,
        border: `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
        borderRadius: componentConfig.linkBorderRadius
          ? `${componentConfig.borderRadius}px`
          : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`,
        padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
        margin: `${componentConfig.marginTop}px ${componentConfig.marginRight}px ${componentConfig.marginBottom}px ${componentConfig.marginLeft}px`,
        width: componentConfig.buttonFullWidth ? '100%' : componentConfig.width,
        height: componentConfig.height,
        minWidth: componentConfig.minWidth || undefined,
        maxWidth: componentConfig.maxWidth || undefined,
        minHeight: componentConfig.minHeight || undefined,
        maxHeight: componentConfig.maxHeight || undefined,
        boxShadow,
        opacity: componentConfig.opacity,
        cursor: 'pointer',
        display: componentConfig.display,
        position: componentConfig.position,
        zIndex: componentConfig.zIndex,
        gap: `${componentConfig.gap}px`,
        transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
        visibility: componentConfig.visible ? 'visible' : 'hidden',
        ...glassmorphismStyles,
      }}
      disabled={componentConfig.buttonLoading}
    >
      {componentConfig.buttonLoading ? (
        <span className="animate-spin mr-2">⏳</span>
      ) : (
        <>
          {IconComponent && componentConfig.buttonIconPosition === 'left' && (
            <IconComponent size={componentConfig.fontSize} className="mr-2" />
          )}
          {componentConfig.text}
          {IconComponent && componentConfig.buttonIconPosition === 'right' && (
            <IconComponent size={componentConfig.fontSize} className="ml-2" />
          )}
        </>
      )}
    </button>
  );
};
