import { useCustomizationStore } from '@/store/useCustomizationStore';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { getLucideIcon } from '@/lib/icons';
import { useState, useEffect } from 'react';

export const TablePreview = () => {
  const { componentConfig } = useCustomizationStore();

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      width: '100%',
      maxWidth: '500px',
      overflow: 'auto',
      borderRadius: '8px',
      border: componentConfig.tableBordered ? '1px solid #E5E7EB' : 'none',
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: `${componentConfig.fontSize}px`,
        fontFamily: componentConfig.fontFamily,
      }}>
        <thead>
          <tr style={{ backgroundColor: '#F9FAFB' }}>
            {componentConfig.tableColumns.map((col, index) => (
              <th key={index} style={{
                padding: componentConfig.tableCompact ? '8px 12px' : '12px 16px',
                textAlign: 'left',
                fontWeight: 600,
                color: '#374151',
                borderBottom: '1px solid #E5E7EB',
                borderRight: componentConfig.tableBordered && index < componentConfig.tableColumns.length - 1 ? '1px solid #E5E7EB' : 'none',
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {componentConfig.tableRows.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              style={{
                backgroundColor: componentConfig.tableStriped && rowIndex % 2 === 1 ? '#F9FAFB' : '#FFFFFF',
                transition: 'background-color 150ms ease',
              }}
              onMouseEnter={(e) => {
                if (componentConfig.tableHoverable) {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                }
              }}
              onMouseLeave={(e) => {
                if (componentConfig.tableHoverable) {
                  e.currentTarget.style.backgroundColor = componentConfig.tableStriped && rowIndex % 2 === 1 ? '#F9FAFB' : '#FFFFFF';
                }
              }}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{
                  padding: componentConfig.tableCompact ? '8px 12px' : '12px 16px',
                  color: '#374151',
                  borderBottom: rowIndex < componentConfig.tableRows.length - 1 ? '1px solid #E5E7EB' : 'none',
                  borderRight: componentConfig.tableBordered && cellIndex < row.length - 1 ? '1px solid #E5E7EB' : 'none',
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const GridPreview = () => {
  const { componentConfig } = useCustomizationStore();

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${componentConfig.gridColumns}, 1fr)`,
      gap: `${componentConfig.gridGap}px`,
      width: '100%',
      maxWidth: '400px',
    }}>
      {Array.from({ length: componentConfig.gridItems }).map((_, index) => (
        <div
          key={index}
          style={{
            aspectRatio: '1',
            backgroundColor: '#EFF6FF',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 600,
            color: '#3B82F6',
          }}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export const TimelinePreview = () => {
  const { componentConfig } = useCustomizationStore();

  const isHorizontal = componentConfig.timelineOrientation === 'horizontal';

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: isHorizontal ? 'row' : 'column',
      gap: '0',
    }}>
      {componentConfig.timelineItems.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'column' : 'row',
            alignItems: isHorizontal ? 'center' : 'flex-start',
            gap: '12px',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'row' : 'column',
            alignItems: 'center',
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#3B82F6',
              border: '3px solid #BFDBFE',
            }} />
            {index < componentConfig.timelineItems.length - 1 && (
              <div style={{
                width: isHorizontal ? '60px' : '2px',
                height: isHorizontal ? '2px' : '60px',
                backgroundColor: '#E5E7EB',
              }} />
            )}
          </div>
          <div style={{
            flex: 1,
            paddingBottom: isHorizontal ? 0 : '24px',
            textAlign: isHorizontal ? 'center' : 'left',
          }}>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>{item.date}</span>
            <h4 style={{ margin: '4px 0', fontSize: '15px', fontWeight: 600, color: '#111827' }}>
              {item.title}
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CarouselPreview = () => {
  const { componentConfig } = useCustomizationStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!componentConfig.carouselAutoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % componentConfig.carouselItems.length);
    }, componentConfig.carouselInterval);
    return () => clearInterval(interval);
  }, [componentConfig.carouselAutoplay, componentConfig.carouselInterval, componentConfig.carouselItems.length]);

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      position: 'relative',
      width: '400px',
      height: '200px',
      borderRadius: `${componentConfig.borderRadius}px`,
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        width: `${componentConfig.carouselItems.length * 100}%`,
        transform: `translateX(-${currentSlide * (100 / componentConfig.carouselItems.length)}%)`,
        transition: 'transform 300ms ease-in-out',
      }}>
        {componentConfig.carouselItems.map((slide, index) => (
          <div
            key={index}
            style={{
              width: `${100 / componentConfig.carouselItems.length}%`,
              height: '200px',
              backgroundColor: `hsl(${index * 60 + 200}, 70%, 95%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 600,
              color: `hsl(${index * 60 + 200}, 70%, 40%)`,
            }}
          >
            {slide}
          </div>
        ))}
      </div>
      
      {componentConfig.carouselShowArrows && (
        <>
          <button
            onClick={() => setCurrentSlide(prev => prev === 0 ? componentConfig.carouselItems.length - 1 : prev - 1)}
            style={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % componentConfig.carouselItems.length)}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
      
      {componentConfig.carouselShowDots && (
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
        }}>
          {componentConfig.carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: currentSlide === index ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentSlide === index ? '#3B82F6' : 'rgba(255,255,255,0.7)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ImagePreview = () => {
  const { componentConfig } = useCustomizationStore();

  if (!componentConfig.visible) return null;

  return (
    <img
      src={componentConfig.imageSrc}
      alt={componentConfig.imageAlt}
      loading={componentConfig.imageLazyLoad ? 'lazy' : 'eager'}
      style={{
        width: componentConfig.width === 'auto' ? '300px' : componentConfig.width,
        height: componentConfig.height === 'auto' ? '200px' : componentConfig.height,
        objectFit: componentConfig.imageObjectFit,
        borderRadius: `${componentConfig.borderRadius}px`,
        opacity: componentConfig.opacity,
      }}
    />
  );
};

export const AvatarPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const getSizeStyles = () => {
    switch (componentConfig.avatarSize) {
      case 'xs': return { size: 24, fontSize: 10 };
      case 'sm': return { size: 32, fontSize: 12 };
      case 'lg': return { size: 56, fontSize: 20 };
      case 'xl': return { size: 72, fontSize: 26 };
      default: return { size: 40, fontSize: 14 };
    }
  };

  const getStatusColor = () => {
    switch (componentConfig.avatarStatus) {
      case 'online': return '#22C55E';
      case 'offline': return '#9CA3AF';
      case 'busy': return '#EF4444';
      default: return 'transparent';
    }
  };

  const sizeStyles = getSizeStyles();

  if (!componentConfig.visible) return null;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        width: `${sizeStyles.size}px`,
        height: `${sizeStyles.size}px`,
        borderRadius: componentConfig.avatarShape === 'circle' ? '50%' : '8px',
        backgroundColor: componentConfig.avatarSrc ? 'transparent' : '#EFF6FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontSize: `${sizeStyles.fontSize}px`,
        fontWeight: 600,
        color: '#3B82F6',
      }}>
        {componentConfig.avatarSrc ? (
          <img
            src={componentConfig.avatarSrc}
            alt="Avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          componentConfig.avatarFallback
        )}
      </div>
      {componentConfig.avatarStatus !== 'none' && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: `${sizeStyles.size * 0.3}px`,
          height: `${sizeStyles.size * 0.3}px`,
          borderRadius: '50%',
          backgroundColor: getStatusColor(),
          border: '2px solid #FFFFFF',
        }} />
      )}
    </div>
  );
};

export const IconPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const IconComponent = getLucideIcon(componentConfig.iconName) ?? Star;

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      {IconComponent && (
        <IconComponent
          size={componentConfig.iconSize}
          strokeWidth={componentConfig.iconStrokeWidth}
          style={{ color: componentConfig.textColor }}
        />
      )}
    </div>
  );
};
