import { useCustomizationStore } from '@/store/useCustomizationStore';
import * as icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useInlineEdit, getInlineEditStyles } from '@/hooks/useInlineEdit';

export const StandardButton = () => {
  const { componentConfig } = useCustomizationStore();
  const { isEditing, editValue, setEditValue, inputRef, startEditing, stopEditing, handleKeyDown } = useInlineEdit('text');

  const IconComponent = componentConfig.buttonIcon 
    ? icons[componentConfig.buttonIcon as keyof typeof icons] as LucideIcon 
    : null;

  // Compute box shadow from individual properties
  const boxShadow = `${componentConfig.boxShadowInset ? 'inset ' : ''}${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`;

  // Compute background (gradient or solid)
  const background = componentConfig.useGradient
    ? componentConfig.gradientType === 'linear'
      ? `linear-gradient(${componentConfig.gradientAngle}deg, ${componentConfig.gradientStart}, ${componentConfig.gradientEnd})`
      : `radial-gradient(circle, ${componentConfig.gradientStart}, ${componentConfig.gradientEnd})`
    : componentConfig.backgroundColor;

  // Border radius
  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  // Glassmorphism styles
  const glassmorphismStyles: React.CSSProperties = componentConfig.glassmorphism
    ? {
        backdropFilter: `blur(${componentConfig.glassBlur}px)`,
        WebkitBackdropFilter: `blur(${componentConfig.glassBlur}px)`,
        background: `rgba(255, 255, 255, ${componentConfig.glassOpacity})`,
        border: `1px solid rgba(255, 255, 255, 0.2)`,
      }
    : {};

  const textStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    color: componentConfig.textColor,
    cursor: 'text',
  };

  return (
    <button
      className="inline-flex items-center justify-center"
      style={{
        // Typography
        fontFamily: componentConfig.fontFamily,
        fontSize: `${componentConfig.fontSize}px`,
        fontWeight: componentConfig.fontWeight,
        fontStyle: componentConfig.fontStyle,
        lineHeight: componentConfig.lineHeight,
        letterSpacing: `${componentConfig.letterSpacing}px`,
        textAlign: componentConfig.textAlign,
        textDecoration: componentConfig.textDecoration,
        textTransform: componentConfig.textTransform,
        
        // Colors & Background
        background: componentConfig.glassmorphism ? undefined : background,
        color: componentConfig.textColor,
        
        // Border
        border: componentConfig.glassmorphism ? undefined : `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
        borderRadius,
        
        // Spacing
        padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
        margin: `${componentConfig.marginTop}px ${componentConfig.marginRight}px ${componentConfig.marginBottom}px ${componentConfig.marginLeft}px`,
        
        // Size
        width: componentConfig.buttonFullWidth ? '100%' : (componentConfig.width === 'auto' ? 'auto' : componentConfig.width),
        height: componentConfig.height === 'auto' ? 'auto' : componentConfig.height,
        minWidth: componentConfig.minWidth || undefined,
        maxWidth: componentConfig.maxWidth || undefined,
        minHeight: componentConfig.minHeight || undefined,
        maxHeight: componentConfig.maxHeight || undefined,
        
        // Effects
        boxShadow,
        opacity: componentConfig.opacity,
        
        // Layout
        display: 'inline-flex',
        gap: `${componentConfig.gap}px`,
        
        // Interaction
        cursor: componentConfig.buttonLoading ? 'wait' : 'pointer',
        transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
        visibility: componentConfig.visible ? 'visible' : 'hidden',
        
        // Glassmorphism overrides
        ...glassmorphismStyles,
      }}
      disabled={componentConfig.buttonLoading}
    >
      {componentConfig.buttonLoading ? (
        <svg 
          className="animate-spin" 
          width={componentConfig.fontSize} 
          height={componentConfig.fontSize} 
          viewBox="0 0 24 24" 
          fill="none"
          style={{ marginRight: '8px' }}
        >
          <circle 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            opacity="0.25"
          />
          <path 
            d="M12 2a10 10 0 0 1 10 10" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <>
          {IconComponent && componentConfig.buttonIconPosition === 'left' && (
            <IconComponent size={componentConfig.fontSize} style={{ marginRight: '8px' }} />
          )}
        </>
      )}
      {isEditing ? (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={stopEditing}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          style={getInlineEditStyles(textStyles)}
        />
      ) : (
        <span onClick={(e) => { e.stopPropagation(); startEditing(); }} title="Click to edit">
          {componentConfig.text}
        </span>
      )}
      {!componentConfig.buttonLoading && IconComponent && componentConfig.buttonIconPosition === 'right' && (
        <IconComponent size={componentConfig.fontSize} style={{ marginLeft: '8px' }} />
      )}
    </button>
  );
};
