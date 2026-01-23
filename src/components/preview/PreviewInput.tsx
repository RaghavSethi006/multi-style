import { useCustomizationStore } from '@/store/useCustomizationStore';

export const PreviewInput = () => {
  const { componentConfig, activeState } = useCustomizationStore();

  const getBoxShadow = () => {
    const { boxShadowInset, boxShadowX, boxShadowY, boxShadowBlur, boxShadowSpread, boxShadowColor } = componentConfig;
    return `${boxShadowInset ? 'inset ' : ''}${boxShadowX}px ${boxShadowY}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor}`;
  };

  const getBorderRadius = () => {
    if (componentConfig.linkBorderRadius) {
      return `${componentConfig.borderRadius}px`;
    }
    return `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;
  };

  const getValidationBorderColor = () => {
    if (componentConfig.inputValidationState === 'error') return '#ef4444';
    if (componentConfig.inputValidationState === 'success') return '#22c55e';
    return componentConfig.borderColor;
  };

  const getStateStyles = () => {
    if (activeState === 'default') return {};
    
    const stateStyle = componentConfig.stateStyles[activeState];
    const styles: React.CSSProperties = {};
    
    if (stateStyle.backgroundColor) styles.background = stateStyle.backgroundColor;
    if (stateStyle.textColor) styles.color = stateStyle.textColor;
    if (stateStyle.borderColor) styles.borderColor = stateStyle.borderColor;
    if (stateStyle.boxShadow) styles.boxShadow = stateStyle.boxShadow;
    
    return styles;
  };

  const inputStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    backgroundColor: componentConfig.backgroundColor,
    color: componentConfig.textColor,
    borderColor: getValidationBorderColor(),
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius: getBorderRadius(),
    opacity: componentConfig.opacity,
    paddingTop: `${componentConfig.paddingTop}px`,
    paddingRight: `${componentConfig.paddingRight}px`,
    paddingBottom: `${componentConfig.paddingBottom}px`,
    paddingLeft: `${componentConfig.paddingLeft}px`,
    width: componentConfig.width === 'auto' ? '280px' : componentConfig.width,
    boxShadow: getBoxShadow(),
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    outline: 'none',
    ...getStateStyles(),
  };

  if (!componentConfig.visible) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {componentConfig.label && (
        <label 
          style={{ 
            fontFamily: componentConfig.fontFamily,
            fontSize: `${componentConfig.fontSize * 0.875}px`,
            fontWeight: 500,
            color: componentConfig.textColor,
          }}
        >
          {componentConfig.label}
          {componentConfig.inputRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={componentConfig.inputType}
        placeholder={componentConfig.placeholder}
        style={inputStyles}
        disabled={activeState === 'disabled'}
      />
      {componentConfig.inputValidationState === 'error' && (
        <span className="text-sm text-red-500">This field has an error</span>
      )}
      {componentConfig.inputValidationState === 'success' && (
        <span className="text-sm text-green-500">Looks good!</span>
      )}
    </div>
  );
};
