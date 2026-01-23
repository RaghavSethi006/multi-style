import { useCustomizationStore } from '@/store/useCustomizationStore';

export const PreviewCard = () => {
  const { componentConfig, activeState } = useCustomizationStore();

  const getBoxShadow = () => {
    const { boxShadowInset, boxShadowX, boxShadowY, boxShadowBlur, boxShadowSpread, boxShadowColor } = componentConfig;
    const multiplier = componentConfig.cardElevation;
    return `${boxShadowInset ? 'inset ' : ''}${boxShadowX * multiplier}px ${boxShadowY * multiplier}px ${boxShadowBlur * multiplier}px ${boxShadowSpread * multiplier}px ${boxShadowColor}`;
  };

  const getBorderRadius = () => {
    if (componentConfig.linkBorderRadius) {
      return `${componentConfig.borderRadius}px`;
    }
    return `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;
  };

  const getStateStyles = () => {
    if (activeState === 'default') return {};
    
    const stateStyle = componentConfig.stateStyles[activeState];
    const styles: React.CSSProperties = {};
    
    if (stateStyle.backgroundColor) styles.background = stateStyle.backgroundColor;
    if (stateStyle.borderColor) styles.borderColor = stateStyle.borderColor;
    if (stateStyle.boxShadow) styles.boxShadow = stateStyle.boxShadow;
    
    return styles;
  };

  const cardStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    backgroundColor: componentConfig.backgroundColor,
    borderColor: componentConfig.borderColor,
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius: getBorderRadius(),
    opacity: componentConfig.opacity,
    width: componentConfig.width === 'auto' ? '320px' : componentConfig.width,
    boxShadow: getBoxShadow(),
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    overflow: 'hidden',
    ...getStateStyles(),
  };

  if (!componentConfig.visible) {
    return null;
  }

  return (
    <div style={cardStyles}>
      {componentConfig.cardImage && (
        <div 
          className="h-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${componentConfig.cardImage})` }}
        />
      )}
      
      {componentConfig.cardShowHeader && (
        <div 
          className="border-b"
          style={{ 
            padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px`,
            borderColor: componentConfig.borderColor,
          }}
        >
          <h3 
            style={{ 
              fontSize: `${componentConfig.fontSize * 1.25}px`,
              fontWeight: 600,
              color: componentConfig.textColor,
            }}
          >
            Card Title
          </h3>
        </div>
      )}

      <div 
        style={{ 
          padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
        }}
      >
        <p 
          style={{ 
            fontSize: `${componentConfig.fontSize}px`,
            color: componentConfig.textColor,
            opacity: 0.8,
          }}
        >
          {componentConfig.text || 'This is the card content. You can customize the appearance using the property inspector.'}
        </p>
      </div>

      {componentConfig.cardShowFooter && (
        <div 
          className="border-t flex gap-2"
          style={{ 
            padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px`,
            borderColor: componentConfig.borderColor,
          }}
        >
          <button 
            className="px-4 py-2 rounded text-sm font-medium"
            style={{ 
              backgroundColor: 'transparent',
              color: componentConfig.textColor,
              border: `1px solid ${componentConfig.borderColor}`,
            }}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 rounded text-sm font-medium"
            style={{ 
              backgroundColor: componentConfig.textColor,
              color: componentConfig.backgroundColor,
            }}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};
