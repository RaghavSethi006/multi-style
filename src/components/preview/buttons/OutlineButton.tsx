import { useCustomizationStore } from '@/store/useCustomizationStore';
import { getLucideIcon } from '@/lib/icons';
import { computeBorderRadius, computeBoxShadow, computeStateStyles } from '@/lib/styleUtils';
import { useInlineEdit, getInlineEditStyles } from '@/hooks/useInlineEdit';
import { Loader2 } from 'lucide-react';

export const OutlineButton = () => {
  const { componentConfig, activeState } = useCustomizationStore();
  const { isEditing, editValue, setEditValue, inputRef, startEditing, stopEditing, handleKeyDown } = useInlineEdit('text');

  const IconComponent = getLucideIcon(componentConfig.buttonIcon);

  const getStateStyles = (): React.CSSProperties => {
    if (activeState === 'default') return {};
    const hoverDefaults: React.CSSProperties =
      activeState === 'hover'
        ? { background: componentConfig.borderColor, color: '#FFFFFF' }
        : {};
    return {
      ...hoverDefaults,
      ...computeStateStyles(componentConfig, activeState),
    };
  };

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
    borderRadius: computeBorderRadius(componentConfig),
    boxShadow: computeBoxShadow(componentConfig),
    opacity: componentConfig.opacity,
    cursor: activeState === 'disabled' ? 'not-allowed' : 'pointer',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    width: componentConfig.buttonFullWidth ? '100%' : 'auto',
    ...getStateStyles(),
  };

  const textStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    color: 'inherit',
    cursor: 'text',
  };

  if (!componentConfig.visible) return null;

  return (
    <button
      type="button"
      style={buttonStyles}
      disabled={activeState === 'disabled' || componentConfig.buttonLoading}
    >
      {componentConfig.buttonLoading && <Loader2 size={componentConfig.fontSize} className="animate-spin" />}
      {!componentConfig.buttonLoading && IconComponent && componentConfig.buttonIconPosition === 'left' && (
        <IconComponent size={componentConfig.fontSize} />
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
        <IconComponent size={componentConfig.fontSize} />
      )}
    </button>
  );
};
