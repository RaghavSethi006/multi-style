import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Check } from 'lucide-react';
import { useInlineEdit, getInlineEditStyles } from '@/hooks/useInlineEdit';

export const ToggleButton = () => {
  const { componentConfig, activeState, updateComponentConfig } = useCustomizationStore();
  const isSelected = componentConfig.toggleSelected;
  
  const onLabelEdit = useInlineEdit('toggleOnLabel');
  const offLabelEdit = useInlineEdit('toggleOffLabel');
  const currentEdit = isSelected ? onLabelEdit : offLabelEdit;

  const getStateStyles = () => {
    if (activeState === 'disabled') {
      return { opacity: 0.5, cursor: 'not-allowed' };
    }
    return {};
  };

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const boxShadow = `${componentConfig.boxShadowInset ? 'inset ' : ''}${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`;

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
    background: isSelected ? '#3B82F6' : componentConfig.backgroundColor,
    color: isSelected ? '#FFFFFF' : componentConfig.textColor,
    border: `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${isSelected ? '#3B82F6' : componentConfig.borderColor}`,
    borderRadius,
    boxShadow: isSelected ? '0 0 0 3px rgba(59, 130, 246, 0.2)' : boxShadow,
    opacity: componentConfig.opacity,
    cursor: activeState === 'disabled' ? 'not-allowed' : 'pointer',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    ...getStateStyles(),
  };

  const textStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    color: 'inherit',
    cursor: 'text',
  };

  if (!componentConfig.visible) return null;

  const handleClick = () => {
    if (activeState !== 'disabled' && !currentEdit.isEditing) {
      updateComponentConfig({ toggleSelected: !isSelected });
    }
  };

  return (
    <button style={buttonStyles} onClick={handleClick}>
      {isSelected && <Check size={componentConfig.fontSize} />}
      {currentEdit.isEditing ? (
        <input
          ref={currentEdit.inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={currentEdit.editValue}
          onChange={(e) => currentEdit.setEditValue(e.target.value)}
          onBlur={currentEdit.stopEditing}
          onKeyDown={currentEdit.handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          style={getInlineEditStyles(textStyles)}
        />
      ) : (
        <span onClick={(e) => { e.stopPropagation(); currentEdit.startEditing(); }} title="Click to edit">
          {isSelected ? componentConfig.toggleOnLabel : componentConfig.toggleOffLabel}
        </span>
      )}
    </button>
  );
};
