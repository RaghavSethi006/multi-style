import { useCustomizationStore } from '@/store/useCustomizationStore';

export const StandardButton = () => {
  const { buttonConfig } = useCustomizationStore();

  const getAnimationClass = () => {
    switch (buttonConfig.animation) {
      case 'hover-glow':
        return 'hover:shadow-lg hover:shadow-primary/20';
      case 'pulse':
        return 'animate-pulse';
      case 'bounce':
        return 'hover:animate-bounce';
      default:
        return '';
    }
  };

  return (
    <button
      disabled={buttonConfig.disabledState}
      className={`transition-all duration-300 flex items-center justify-center gap-2 ${getAnimationClass()}`}
      style={{
        fontFamily: buttonConfig.fontFamily,
        fontSize: `${buttonConfig.fontSize}px`,
        fontWeight: buttonConfig.fontWeight,
        backgroundColor: buttonConfig.backgroundColor,
        color: buttonConfig.textColor,
        border: `${buttonConfig.borderWidth}px solid ${buttonConfig.borderColor}`,
        borderRadius: `${buttonConfig.borderRadius}px`,
        padding: `${buttonConfig.padding}px ${buttonConfig.padding * 2}px`,
        width: `${buttonConfig.width}px`,
        height: `${buttonConfig.height}px`,
        boxShadow: `0 ${buttonConfig.elevation}px ${buttonConfig.elevation * 2}px rgba(0,0,0,0.1)`,
        cursor: buttonConfig.disabledState ? 'not-allowed' : 'pointer',
        opacity: buttonConfig.disabledState ? 0.5 : 1,
        transform: buttonConfig.hoverEffect ? 'translateY(0)' : undefined,
      }}
      onMouseEnter={(e) => {
        if (buttonConfig.hoverEffect && !buttonConfig.disabledState) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 ${buttonConfig.elevation + 2}px ${(buttonConfig.elevation + 2) * 2}px rgba(0,0,0,0.15)`;
        }
      }}
      onMouseLeave={(e) => {
        if (buttonConfig.hoverEffect) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 ${buttonConfig.elevation}px ${buttonConfig.elevation * 2}px rgba(0,0,0,0.1)`;
        }
      }}
    >
      {buttonConfig.text}
    </button>
  );
};
