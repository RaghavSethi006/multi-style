import { useCustomizationStore } from '@/store/useCustomizationStore';
import * as icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const IconButton = () => {
  const { componentConfig, activeState } = useCustomizationStore();

  const IconComponent = componentConfig.buttonIcon 
    ? icons[componentConfig.buttonIcon as keyof typeof icons] as LucideIcon 
    : icons.Settings;

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

  const borderRadius = componentConfig.iconButtonShape === 'circle' 
    ? '50%' 
    : componentConfig.linkBorderRadius
      ? `${componentConfig.borderRadius}px`
      : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const boxShadow = `${componentConfig.boxShadowInset ? 'inset ' : ''}${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`;

  const buttonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${componentConfig.paddingTop}px`,
    background: componentConfig.useGradient
      ? componentConfig.gradientType === 'linear'
        ? `linear-gradient(${componentConfig.gradientAngle}deg, ${componentConfig.gradientStart}, ${componentConfig.gradientEnd})`
        : `radial-gradient(circle, ${componentConfig.gradientStart}, ${componentConfig.gradientEnd})`
      : componentConfig.backgroundColor,
    color: componentConfig.textColor,
    border: `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
    borderRadius,
    boxShadow,
    opacity: componentConfig.opacity,
    cursor: 'pointer',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    ...getStateStyles(),
  };

  if (!componentConfig.visible) return null;

  return (
    <div className="relative group">
      <button style={buttonStyles} title={componentConfig.iconButtonTooltip}>
        {IconComponent && <IconComponent size={componentConfig.fontSize} />}
      </button>
      {componentConfig.iconButtonTooltip && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {componentConfig.iconButtonTooltip}
        </div>
      )}
    </div>
  );
};
