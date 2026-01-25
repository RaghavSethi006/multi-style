import { useCustomizationStore } from '@/store/useCustomizationStore';

export const ParagraphPreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();

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
    ...getStateStyles(),
  };

  if (!componentConfig.visible) return null;

  return (
    <p style={paragraphStyles}>
      {componentConfig.text}
    </p>
  );
};
