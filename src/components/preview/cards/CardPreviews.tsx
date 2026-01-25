import { useCustomizationStore } from '@/store/useCustomizationStore';
import { ChevronDown, User } from 'lucide-react';
import { useState } from 'react';

export const BasicCardPreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const boxShadow = `${componentConfig.boxShadowInset ? 'inset ' : ''}${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`;

  const cardStyles: React.CSSProperties = {
    width: '320px',
    backgroundColor: componentConfig.backgroundColor,
    borderColor: componentConfig.borderColor,
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius,
    boxShadow,
    overflow: 'hidden',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  if (!componentConfig.visible) return null;

  return (
    <div style={cardStyles}>
      {componentConfig.cardShowHeader && (
        <div style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${componentConfig.borderColor}`,
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 600,
            color: componentConfig.textColor === '#FFFFFF' ? '#111827' : componentConfig.textColor,
          }}>
            {componentConfig.cardTitle}
          </h3>
          {componentConfig.cardSubtitle && (
            <p style={{
              margin: '4px 0 0',
              fontSize: '14px',
              color: '#6B7280',
            }}>
              {componentConfig.cardSubtitle}
            </p>
          )}
        </div>
      )}
      <div style={{ padding: '20px' }}>
        <p style={{
          margin: 0,
          fontSize: `${componentConfig.fontSize}px`,
          color: componentConfig.textColor === '#FFFFFF' ? '#374151' : componentConfig.textColor,
          lineHeight: 1.6,
        }}>
          {componentConfig.text}
        </p>
      </div>
      {componentConfig.cardShowFooter && (
        <div style={{
          padding: '16px 20px',
          borderTop: `1px solid ${componentConfig.borderColor}`,
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
        }}>
          <button style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#6B7280',
            border: `1px solid ${componentConfig.borderColor}`,
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#3B82F6',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export const ImageCardPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const boxShadow = `${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`;

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      width: '320px',
      backgroundColor: componentConfig.backgroundColor,
      borderRadius,
      boxShadow,
      overflow: 'hidden',
    }}>
      <div style={{
        width: '100%',
        height: '180px',
        backgroundImage: `url(${componentConfig.cardImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      <div style={{ padding: '20px' }}>
        <h3 style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: 600,
          color: '#111827',
        }}>
          {componentConfig.cardTitle}
        </h3>
        <p style={{
          margin: '8px 0 0',
          fontSize: '14px',
          color: '#6B7280',
        }}>
          {componentConfig.cardSubtitle}
        </p>
      </div>
    </div>
  );
};

export const ProfileCardPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const borderRadius = `${componentConfig.borderRadius}px`;
  const boxShadow = `${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`;

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      width: '280px',
      backgroundColor: componentConfig.backgroundColor,
      borderRadius,
      boxShadow,
      padding: '32px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#EFF6FF',
        margin: '0 auto 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {componentConfig.profileAvatar ? (
          <img 
            src={componentConfig.profileAvatar} 
            alt={componentConfig.profileName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <User size={40} style={{ color: '#3B82F6' }} />
        )}
      </div>
      <h3 style={{
        margin: 0,
        fontSize: '20px',
        fontWeight: 600,
        color: '#111827',
      }}>
        {componentConfig.profileName}
      </h3>
      <p style={{
        margin: '4px 0 0',
        fontSize: '14px',
        color: '#6B7280',
      }}>
        {componentConfig.profileRole}
      </p>
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        marginTop: '20px',
      }}>
        <button style={{
          flex: 1,
          padding: '10px',
          backgroundColor: '#3B82F6',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
        }}>
          Follow
        </button>
        <button style={{
          flex: 1,
          padding: '10px',
          backgroundColor: 'transparent',
          color: '#374151',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          fontSize: '14px',
          cursor: 'pointer',
        }}>
          Message
        </button>
      </div>
    </div>
  );
};

export const AccordionPreview = () => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();
  const [openItems, setOpenItems] = useState<number[]>(componentConfig.accordionDefaultOpen);

  const toggleItem = (index: number) => {
    if (componentConfig.accordionAllowMultiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const borderRadius = `${componentConfig.borderRadius}px`;

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      width: '400px',
      backgroundColor: componentConfig.backgroundColor,
      border: `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
      borderRadius,
      overflow: 'hidden',
    }}>
      {componentConfig.accordionItems.map((item, index) => (
        <div key={index} style={{
          borderBottom: index < componentConfig.accordionItems.length - 1 
            ? `1px solid ${componentConfig.borderColor}` 
            : 'none',
        }}>
          <button
            onClick={() => toggleItem(index)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: `${componentConfig.fontSize}px`,
              fontWeight: 500,
              color: '#111827',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            {item.title}
            <ChevronDown 
              size={18} 
              style={{
                transform: openItems.includes(index) ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: `transform ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
                color: '#6B7280',
              }}
            />
          </button>
          <div style={{
            maxHeight: openItems.includes(index) ? '200px' : '0',
            overflow: 'hidden',
            transition: `max-height ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
          }}>
            <div style={{
              padding: '0 20px 16px',
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: 1.6,
            }}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
