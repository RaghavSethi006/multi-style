import { useCustomizationStore } from '@/store/useCustomizationStore';
import * as icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const StandardButton = () => {
  const { componentConfig } = useCustomizationStore();

  const IconPrefix = componentConfig.prefixIcon ? icons[componentConfig.prefixIcon as keyof typeof icons] as LucideIcon : null;
  const IconSuffix = componentConfig.suffixIcon ? icons[componentConfig.suffixIcon as keyof typeof icons] as LucideIcon : null;

  return (
    <button
      className="transition-all"
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
        backgroundColor: componentConfig.backgroundColor,
        color: componentConfig.textColor,
        border: `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
        borderRadius: `${componentConfig.borderRadius}px`,
        padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
        margin: `${componentConfig.marginTop}px ${componentConfig.marginRight}px ${componentConfig.marginBottom}px ${componentConfig.marginLeft}px`,
        width: componentConfig.width,
        height: componentConfig.height,
        minWidth: componentConfig.minWidth,
        maxWidth: componentConfig.maxWidth,
        minHeight: componentConfig.minHeight,
        maxHeight: componentConfig.maxHeight,
        boxShadow: componentConfig.boxShadow,
        textShadow: componentConfig.textShadow,
        opacity: componentConfig.opacity,
        cursor: componentConfig.disabledState ? 'not-allowed' : 'pointer',
        display: componentConfig.display,
        position: componentConfig.position,
        top: componentConfig.top,
        left: componentConfig.left,
        right: componentConfig.right,
        bottom: componentConfig.bottom,
        zIndex: componentConfig.zIndex,
        flexDirection: componentConfig.flexDirection,
        justifyContent: componentConfig.justifyContent,
        alignItems: componentConfig.alignItems,
        gap: `${componentConfig.gap}px`,
        transition: `${componentConfig.transitionProperty} ${componentConfig.transitionDuration}ms ${componentConfig.transitionTimingFunction} ${componentConfig.transitionDelay}ms`,
        backgroundImage: componentConfig.gradient || componentConfig.backgroundImage,
        backgroundPosition: componentConfig.backgroundPosition,
        backgroundRepeat: componentConfig.backgroundRepeat,
        backgroundSize: componentConfig.backgroundSize,
        backgroundAttachment: componentConfig.backgroundAttachment,
      }}
      disabled={componentConfig.disabledState}
    >
      {IconPrefix && <IconPrefix size={20} />}
      {componentConfig.text}
      {IconSuffix && <IconSuffix size={20} />}
    </button>
  );
};
