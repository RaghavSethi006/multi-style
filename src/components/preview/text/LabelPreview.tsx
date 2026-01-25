import { useCustomizationStore } from '@/store/useCustomizationStore';

export const LabelPreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();

  const getStateStyles = () => {
    if (activeState === 'default') return {};
    const stateStyle = componentConfig.stateStyles[activeState];
    const styles: React.CSSProperties = {};
    if (stateStyle.textColor) styles.color = stateStyle.textColor;
    return styles;
  };

  const labelStyles: React.CSSProperties = {
    display: 'inline-block',
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
    opacity: componentConfig.opacity,
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    ...getStateStyles(),
  };

  if (!componentConfig.visible) return null;

  return (
    <label style={labelStyles}>
      {componentConfig.text}
      {componentConfig.inputRequired && (
        <span style={{ color: '#EF4444', marginLeft: '4px' }}>*</span>
      )}
    </label>
  );
};
