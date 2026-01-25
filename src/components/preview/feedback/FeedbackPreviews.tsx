import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { useState } from 'react';

export const AlertPreview = () => {
  const { componentConfig } = useCustomizationStore();
  const [dismissed, setDismissed] = useState(false);

  const getAlertStyles = () => {
    switch (componentConfig.alertType) {
      case 'success':
        return { bg: '#F0FDF4', border: '#22C55E', icon: CheckCircle, iconColor: '#22C55E' };
      case 'warning':
        return { bg: '#FFFBEB', border: '#F59E0B', icon: AlertTriangle, iconColor: '#F59E0B' };
      case 'error':
        return { bg: '#FEF2F2', border: '#EF4444', icon: XCircle, iconColor: '#EF4444' };
      default:
        return { bg: '#EFF6FF', border: '#3B82F6', icon: Info, iconColor: '#3B82F6' };
    }
  };

  const alertStyle = getAlertStyles();
  const Icon = alertStyle.icon;

  if (!componentConfig.visible || dismissed) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      width: '400px',
      padding: '16px',
      backgroundColor: alertStyle.bg,
      borderLeft: `4px solid ${alertStyle.border}`,
      borderRadius: `${componentConfig.borderRadius}px`,
    }}>
      {componentConfig.alertShowIcon && (
        <Icon size={20} style={{ color: alertStyle.iconColor, flexShrink: 0, marginTop: '2px' }} />
      )}
      <div style={{ flex: 1 }}>
        {componentConfig.alertTitle && (
          <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: '#111827' }}>
            {componentConfig.alertTitle}
          </h4>
        )}
        <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
          {componentConfig.alertMessage}
        </p>
      </div>
      {componentConfig.alertDismissible && (
        <button
          onClick={() => setDismissed(true)}
          style={{
            padding: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9CA3AF',
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export const ToastPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const getPositionStyles = (): React.CSSProperties => {
    const positions: Record<string, React.CSSProperties> = {
      'top-left': { top: '16px', left: '16px' },
      'top-center': { top: '16px', left: '50%', transform: 'translateX(-50%)' },
      'top-right': { top: '16px', right: '16px' },
      'bottom-left': { bottom: '16px', left: '16px' },
      'bottom-center': { bottom: '16px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-right': { bottom: '16px', right: '16px' },
    };
    return positions[componentConfig.toastPosition] || positions['top-right'];
  };

  const getToastStyles = () => {
    switch (componentConfig.alertType) {
      case 'success':
        return { bg: '#22C55E', icon: CheckCircle };
      case 'warning':
        return { bg: '#F59E0B', icon: AlertTriangle };
      case 'error':
        return { bg: '#EF4444', icon: XCircle };
      default:
        return { bg: '#3B82F6', icon: Info };
    }
  };

  const toastStyle = getToastStyles();
  const Icon = toastStyle.icon;

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      position: 'relative',
      width: '400px',
      height: '200px',
      backgroundColor: '#F9FAFB',
      borderRadius: '8px',
      border: '1px dashed #D1D5DB',
    }}>
      <span style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        fontSize: '12px',
        color: '#9CA3AF',
      }}>
        Toast Preview Area
      </span>
      <div style={{
        position: 'absolute',
        ...getPositionStyles(),
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: toastStyle.bg,
        borderRadius: `${componentConfig.borderRadius}px`,
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
        color: '#FFFFFF',
      }}>
        <Icon size={18} />
        <span style={{ fontSize: '14px', fontWeight: 500 }}>{componentConfig.text}</span>
      </div>
    </div>
  );
};

export const BadgePreview = () => {
  const { componentConfig } = useCustomizationStore();

  const getBadgeStyles = () => {
    switch (componentConfig.badgeVariant) {
      case 'secondary':
        return { bg: '#F3F4F6', color: '#374151', border: 'none' };
      case 'outline':
        return { bg: 'transparent', color: '#374151', border: '1px solid #E5E7EB' };
      case 'destructive':
        return { bg: '#FEE2E2', color: '#DC2626', border: 'none' };
      default:
        return { bg: '#3B82F6', color: '#FFFFFF', border: 'none' };
    }
  };

  const badgeStyle = getBadgeStyles();

  if (!componentConfig.visible) return null;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
      backgroundColor: badgeStyle.bg,
      color: badgeStyle.color,
      border: badgeStyle.border,
      borderRadius: `${componentConfig.borderRadius}px`,
      fontSize: `${componentConfig.fontSize}px`,
      fontWeight: 500,
    }}>
      {componentConfig.badgeContent}
    </span>
  );
};

export const ProgressPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const getSizeStyles = () => {
    switch (componentConfig.progressSize) {
      case 'sm': return { height: '6px', fontSize: '10px' };
      case 'lg': return { height: '16px', fontSize: '12px' };
      default: return { height: '10px', fontSize: '11px' };
    }
  };

  const sizeStyles = getSizeStyles();

  if (!componentConfig.visible) return null;

  return (
    <div style={{ width: '300px' }}>
      {componentConfig.progressShowLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '14px',
          color: '#374151',
        }}>
          <span>Progress</span>
          <span style={{ fontWeight: 600 }}>{componentConfig.progressValue}%</span>
        </div>
      )}
      <div style={{
        width: '100%',
        height: sizeStyles.height,
        backgroundColor: componentConfig.backgroundColor,
        borderRadius: `${componentConfig.borderRadius}px`,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${componentConfig.progressValue}%`,
          height: '100%',
          backgroundColor: '#3B82F6',
          borderRadius: `${componentConfig.borderRadius}px`,
          transition: 'width 300ms ease',
          backgroundImage: componentConfig.progressVariant === 'striped' || componentConfig.progressVariant === 'animated'
            ? 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)'
            : 'none',
          backgroundSize: '1rem 1rem',
          animation: componentConfig.progressVariant === 'animated' ? 'progress-stripes 1s linear infinite' : 'none',
        }} />
      </div>
    </div>
  );
};

export const SkeletonPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const getSkeletonStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      backgroundColor: componentConfig.backgroundColor,
      animation: componentConfig.skeletonAnimation === 'pulse' 
        ? 'skeleton-pulse 2s ease-in-out infinite'
        : componentConfig.skeletonAnimation === 'wave'
          ? 'skeleton-wave 1.5s ease-in-out infinite'
          : 'none',
    };

    switch (componentConfig.skeletonVariant) {
      case 'circular':
        return { ...baseStyles, width: '48px', height: '48px', borderRadius: '50%' };
      case 'text':
        return { ...baseStyles, width: '200px', height: '16px', borderRadius: '4px' };
      default:
        return { ...baseStyles, width: '300px', height: '120px', borderRadius: `${componentConfig.borderRadius}px` };
    }
  };

  if (!componentConfig.visible) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={getSkeletonStyles()} />
      {componentConfig.skeletonVariant === 'rectangular' && (
        <>
          <div style={{ ...getSkeletonStyles(), height: '16px', width: '80%' }} />
          <div style={{ ...getSkeletonStyles(), height: '16px', width: '60%' }} />
        </>
      )}
      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes skeleton-wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export const TooltipPreview = () => {
  const { componentConfig } = useCustomizationStore();
  const [showTooltip, setShowTooltip] = useState(false);

  const getTooltipPosition = (): React.CSSProperties => {
    switch (componentConfig.tooltipPosition) {
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' };
      case 'left':
        return { top: '50%', right: '100%', transform: 'translateY(-50%)', marginRight: '8px' };
      case 'right':
        return { top: '50%', left: '100%', transform: 'translateY(-50%)', marginLeft: '8px' };
      default:
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' };
    }
  };

  if (!componentConfig.visible) return null;

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => componentConfig.tooltipTrigger === 'hover' && setShowTooltip(true)}
      onMouseLeave={() => componentConfig.tooltipTrigger === 'hover' && setShowTooltip(false)}
      onClick={() => componentConfig.tooltipTrigger === 'click' && setShowTooltip(!showTooltip)}
    >
      <button style={{
        padding: '10px 20px',
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
      }}>
        {componentConfig.text}
      </button>
      {showTooltip && (
        <div style={{
          position: 'absolute',
          ...getTooltipPosition(),
          padding: '8px 12px',
          backgroundColor: '#1F2937',
          color: '#FFFFFF',
          borderRadius: '6px',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          zIndex: 50,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        }}>
          {componentConfig.tooltipContent}
        </div>
      )}
    </div>
  );
};

export const ModalPreview = () => {
  const { componentConfig } = useCustomizationStore();
  const [isOpen, setIsOpen] = useState(false);

  const getSizeStyles = () => {
    switch (componentConfig.modalSize) {
      case 'sm': return { maxWidth: '320px' };
      case 'lg': return { maxWidth: '640px' };
      case 'full': return { maxWidth: '90vw', width: '100%' };
      default: return { maxWidth: '480px' };
    }
  };

  if (!componentConfig.visible) return null;

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3B82F6',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        Open Modal
      </button>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `rgba(0,0,0,${componentConfig.modalOverlayOpacity})`,
            zIndex: 100,
          }}
          onClick={() => componentConfig.modalCloseOnOverlay && setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              ...getSizeStyles(),
              width: '100%',
              backgroundColor: componentConfig.backgroundColor,
              borderRadius: `${componentConfig.borderRadius}px`,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              animation: `modal-${componentConfig.modalAnimation} 200ms ease-out`,
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid #E5E7EB',
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#111827' }}>
                {componentConfig.modalTitle}
              </h3>
              {componentConfig.modalShowClose && (
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: '4px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6B7280',
                  }}
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
                {componentConfig.text}
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              padding: '16px 20px',
              borderTop: '1px solid #E5E7EB',
            }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#6B7280',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes modal-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes modal-slide {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
