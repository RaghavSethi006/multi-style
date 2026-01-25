import { useCustomizationStore } from '@/store/useCustomizationStore';

export const HeadingPreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();

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
    ...getStateStyles(),
  };

  if (!componentConfig.visible) return null;

  const HeadingTag = `h${componentConfig.headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag style={headingStyles}>
      {componentConfig.text}
    </HeadingTag>
  );
};
