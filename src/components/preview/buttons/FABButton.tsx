import { useCustomizationStore } from '@/store/useCustomizationStore';
import * as icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useInlineEdit, getInlineEditStyles } from '@/hooks/useInlineEdit';

export const FABButton = () => {
  const { componentConfig, activeState } = useCustomizationStore();
  const { isEditing, editValue, setEditValue, inputRef, startEditing, stopEditing, handleKeyDown } = useInlineEdit('text');

  const IconComponent = componentConfig.buttonIcon 
    ? icons[componentConfig.buttonIcon as keyof typeof icons] as LucideIcon 
    : icons.Plus;

  const getStateStyles = () => {
    if (activeState === 'default') return {};
    const stateStyle = componentConfig.stateStyles[activeState];
    const styles: React.CSSProperties = {};
    if (stateStyle.backgroundColor) styles.background = stateStyle.backgroundColor;
    if (stateStyle.textColor) styles.color = stateStyle.textColor;
    if (stateStyle.boxShadow) styles.boxShadow = stateStyle.boxShadow;
    return styles;
  };

  const boxShadow = `${componentConfig.boxShadowInset ? 'inset ' : ''}${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`;

  const getPositionStyles = (): React.CSSProperties => {
    switch (componentConfig.fabPosition) {
      case 'bottom-right': return { bottom: '24px', right: '24px' };
      case 'bottom-left': return { bottom: '24px', left: '24px' };
      case 'top-right': return { top: '24px', right: '24px' };
      case 'top-left': return { top: '24px', left: '24px' };
      default: return { bottom: '24px', right: '24px' };
    }
  };

  const buttonStyles: React.CSSProperties = {
    position: 'absolute',
    ...getPositionStyles(),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: componentConfig.fabExtended ? '8px' : undefined,
    padding: `${componentConfig.paddingTop}px ${componentConfig.fabExtended ? componentConfig.paddingRight : componentConfig.paddingTop}px`,
    background: componentConfig.useGradient
      ? componentConfig.gradientType === 'linear'
        ? `linear-gradient(${componentConfig.gradientAngle}deg, ${componentConfig.gradientStart}, ${componentConfig.gradientEnd})`
        : `radial-gradient(circle, ${componentConfig.gradientStart}, ${componentConfig.gradientEnd})`
      : componentConfig.backgroundColor,
    color: componentConfig.textColor,
    border: 'none',
    borderRadius: componentConfig.fabExtended ? `${componentConfig.borderRadius}px` : '50%',
    boxShadow,
    opacity: componentConfig.opacity,
    cursor: 'pointer',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    zIndex: 50,
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    ...getStateStyles(),
  };

  const textStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    color: 'inherit',
    cursor: 'text',
  };

  if (!componentConfig.visible) return null;

  return (
    <div className="relative w-full h-48 border border-dashed border-gray-300 rounded-lg bg-gray-50">
      <span className="absolute top-2 left-2 text-xs text-gray-400">FAB Preview Area</span>
      <button style={buttonStyles}>
        {IconComponent && <IconComponent size={componentConfig.fontSize * 1.5} />}
        {componentConfig.fabExtended && componentConfig.text && (
          isEditing ? (
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
          )
        )}
      </button>
    </div>
  );
};
