import { useCustomizationStore } from '@/store/useCustomizationStore';
import { getLucideIcon } from '@/lib/icons';
import {
  computeBackground,
  computeBorderRadius,
  computeBoxShadow,
  computeGlassmorphismStyles,
  computeStateStyles,
} from '@/lib/styleUtils';
import { useInlineEdit, getInlineEditStyles } from '@/hooks/useInlineEdit';

export const StandardButton = () => {
  const { componentConfig, activeState } = useCustomizationStore();
  const { isEditing, editValue, setEditValue, inputRef, startEditing, stopEditing, handleKeyDown } = useInlineEdit('text');

  const IconComponent = getLucideIcon(componentConfig.buttonIcon);
  const boxShadow = computeBoxShadow(componentConfig);
  const background = computeBackground(componentConfig);
  const borderRadius = computeBorderRadius(componentConfig);
  const glassmorphismStyles = computeGlassmorphismStyles(componentConfig);
  const stateStyles = computeStateStyles(componentConfig, activeState);
  const isDisabled = componentConfig.buttonLoading || activeState === 'disabled';

  const textStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    color: 'inherit',
    cursor: 'text',
  };

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center"
      style={{
        fontFamily: componentConfig.fontFamily,
        fontSize: `${componentConfig.fontSize}px`,
        fontWeight: componentConfig.fontWeight,
        fontStyle: componentConfig.fontStyle,
        lineHeight: componentConfig.lineHeight,
        letterSpacing: `${componentConfig.letterSpacing}px`,
        textAlign: componentConfig.textAlign,
        textDecoration: componentConfig.textDecoration,
        textTransform: componentConfig.textTransform,
        background: componentConfig.glassmorphism ? undefined : background,
        color: componentConfig.textColor,
        border: componentConfig.glassmorphism
          ? undefined
          : `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
        borderRadius,
        padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
        margin: `${componentConfig.marginTop}px ${componentConfig.marginRight}px ${componentConfig.marginBottom}px ${componentConfig.marginLeft}px`,
        width: componentConfig.buttonFullWidth ? '100%' : componentConfig.width,
        height: componentConfig.height,
        minWidth: componentConfig.minWidth || undefined,
        maxWidth: componentConfig.maxWidth || undefined,
        minHeight: componentConfig.minHeight || undefined,
        maxHeight: componentConfig.maxHeight || undefined,
        boxShadow,
        opacity: activeState === 'disabled' ? Math.min(componentConfig.opacity, 0.7) : componentConfig.opacity,
        display: 'inline-flex',
        gap: `${componentConfig.gap}px`,
        cursor: componentConfig.buttonLoading ? 'wait' : activeState === 'disabled' ? 'not-allowed' : 'pointer',
        transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
        visibility: componentConfig.visible ? 'visible' : 'hidden',
        ...glassmorphismStyles,
        ...stateStyles,
      }}
      disabled={isDisabled}
    >
      {componentConfig.buttonLoading ? (
        <svg
          className="animate-spin"
          width={componentConfig.fontSize}
          height={componentConfig.fontSize}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
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
        IconComponent &&
        componentConfig.buttonIconPosition === 'left' && (
          <IconComponent size={componentConfig.fontSize} />
        )
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
      {!componentConfig.buttonLoading &&
        IconComponent &&
        componentConfig.buttonIconPosition === 'right' && (
          <IconComponent size={componentConfig.fontSize} />
        )}
    </button>
  );
};
