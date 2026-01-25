import { useCustomizationStore } from '@/store/useCustomizationStore';
import { ChevronRight, ChevronLeft, Check, Menu } from 'lucide-react';
import { useState } from 'react';

export const NavbarPreview = () => {
  const { componentConfig, updateComponentConfig, activeState } = useCustomizationStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHorizontal = componentConfig.navbarOrientation === 'horizontal';

  const navStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    alignItems: isHorizontal ? 'center' : 'stretch',
    justifyContent: isHorizontal ? 'space-between' : 'flex-start',
    gap: isHorizontal ? '0' : '4px',
    backgroundColor: componentConfig.backgroundColor,
    borderColor: componentConfig.borderColor,
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius: `${componentConfig.borderRadius}px`,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
    width: isHorizontal ? '100%' : '200px',
    maxWidth: '600px',
  };

  if (!componentConfig.visible) return null;

  return (
    <nav style={navStyles}>
      <div style={{ fontWeight: 700, fontSize: '18px', color: componentConfig.textColor === '#FFFFFF' ? '#111827' : componentConfig.textColor }}>
        Logo
      </div>
      <div style={{ 
        display: 'flex', 
        flexDirection: isHorizontal ? 'row' : 'column',
        gap: isHorizontal ? '8px' : '4px',
      }}>
        {componentConfig.navbarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => updateComponentConfig({ navbarActiveIndex: index })}
            style={{
              padding: '8px 16px',
              backgroundColor: componentConfig.navbarActiveIndex === index ? '#EFF6FF' : 'transparent',
              color: componentConfig.navbarActiveIndex === index ? '#3B82F6' : '#6B7280',
              border: 'none',
              borderRadius: '6px',
              fontSize: `${componentConfig.fontSize}px`,
              fontWeight: componentConfig.navbarActiveIndex === index ? 600 : 400,
              cursor: 'pointer',
              transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
              textAlign: 'left',
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export const TabsPreview = () => {
  const { componentConfig, updateComponentConfig, activeState } = useCustomizationStore();

  const getTabStyles = (index: number) => {
    const isActive = componentConfig.tabActiveIndex === index;
    const baseStyles: React.CSSProperties = {
      padding: '10px 20px',
      fontSize: `${componentConfig.fontSize}px`,
      fontWeight: isActive ? 600 : 400,
      cursor: 'pointer',
      border: 'none',
      transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    };

    switch (componentConfig.tabVariant) {
      case 'pills':
        return {
          ...baseStyles,
          backgroundColor: isActive ? '#3B82F6' : 'transparent',
          color: isActive ? '#FFFFFF' : '#6B7280',
          borderRadius: '9999px',
        };
      case 'underline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: isActive ? '#3B82F6' : '#6B7280',
          borderBottom: isActive ? '2px solid #3B82F6' : '2px solid transparent',
          borderRadius: 0,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: isActive ? '#FFFFFF' : 'transparent',
          color: isActive ? '#3B82F6' : '#6B7280',
          borderRadius: '8px 8px 0 0',
          borderBottom: isActive ? '2px solid #3B82F6' : 'none',
        };
    }
  };

  if (!componentConfig.visible) return null;

  return (
    <div style={{ 
      backgroundColor: componentConfig.tabVariant === 'pills' ? '#F3F4F6' : 'transparent',
      borderRadius: componentConfig.tabVariant === 'pills' ? '9999px' : 0,
      padding: componentConfig.tabVariant === 'pills' ? '4px' : 0,
      display: 'inline-flex',
      gap: componentConfig.tabVariant === 'pills' ? '4px' : 0,
      borderBottom: componentConfig.tabVariant === 'underline' ? '1px solid #E5E7EB' : 'none',
    }}>
      {componentConfig.tabItems.map((tab, index) => (
        <button
          key={index}
          onClick={() => updateComponentConfig({ tabActiveIndex: index })}
          style={getTabStyles(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export const BreadcrumbsPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const getSeparator = () => {
    switch (componentConfig.breadcrumbSeparator) {
      case 'chevron':
        return <ChevronRight size={16} style={{ color: '#9CA3AF' }} />;
      case 'arrow':
        return <span style={{ color: '#9CA3AF', margin: '0 4px' }}>→</span>;
      default:
        return <span style={{ color: '#9CA3AF', margin: '0 8px' }}>/</span>;
    }
  };

  if (!componentConfig.visible) return null;

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {componentConfig.breadcrumbItems.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{
            color: index === componentConfig.breadcrumbItems.length - 1 ? '#111827' : '#6B7280',
            fontWeight: index === componentConfig.breadcrumbItems.length - 1 ? 500 : 400,
            fontSize: `${componentConfig.fontSize}px`,
            cursor: index === componentConfig.breadcrumbItems.length - 1 ? 'default' : 'pointer',
          }}>
            {item}
          </span>
          {index < componentConfig.breadcrumbItems.length - 1 && getSeparator()}
        </div>
      ))}
    </nav>
  );
};

export const PaginationPreview = () => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();

  const totalPages = Math.ceil(componentConfig.paginationTotal / componentConfig.paginationPageSize);
  const currentPage = componentConfig.paginationCurrent;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const buttonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    height: '36px',
    padding: '0 10px',
    fontSize: '14px',
    border: `1px solid ${componentConfig.borderColor}`,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  if (!componentConfig.visible) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <button
        onClick={() => updateComponentConfig({ paginationCurrent: Math.max(1, currentPage - 1) })}
        disabled={currentPage === 1}
        style={{
          ...buttonStyles,
          backgroundColor: '#FFFFFF',
          color: currentPage === 1 ? '#D1D5DB' : '#374151',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        <ChevronLeft size={16} />
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && updateComponentConfig({ paginationCurrent: page })}
          disabled={typeof page === 'string'}
          style={{
            ...buttonStyles,
            backgroundColor: page === currentPage ? '#3B82F6' : '#FFFFFF',
            color: page === currentPage ? '#FFFFFF' : '#374151',
            fontWeight: page === currentPage ? 600 : 400,
            cursor: typeof page === 'string' ? 'default' : 'pointer',
          }}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => updateComponentConfig({ paginationCurrent: Math.min(totalPages, currentPage + 1) })}
        disabled={currentPage === totalPages}
        style={{
          ...buttonStyles,
          backgroundColor: '#FFFFFF',
          color: currentPage === totalPages ? '#D1D5DB' : '#374151',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export const StepperPreview = () => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();

  const isHorizontal = componentConfig.stepperOrientation === 'horizontal';

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: isHorizontal ? 'row' : 'column',
      alignItems: isHorizontal ? 'center' : 'flex-start',
      gap: isHorizontal ? '0' : '0',
    }}>
      {componentConfig.stepperSteps.map((step, index) => {
        const isCompleted = index < componentConfig.stepperCurrentStep;
        const isCurrent = index === componentConfig.stepperCurrentStep;
        const isLast = index === componentConfig.stepperSteps.length - 1;

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: isHorizontal ? 'row' : 'row',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: isHorizontal ? 'column' : 'row',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
              onClick={() => updateComponentConfig({ stepperCurrentStep: index })}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: isCompleted ? '#22C55E' : isCurrent ? '#3B82F6' : '#E5E7EB',
                color: isCompleted || isCurrent ? '#FFFFFF' : '#6B7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '14px',
                transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
              }}>
                {isCompleted ? <Check size={18} /> : index + 1}
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: isCurrent ? 600 : 400,
                color: isCurrent ? '#111827' : '#6B7280',
                whiteSpace: 'nowrap',
              }}>
                {step}
              </span>
            </div>
            {!isLast && (
              <div style={{
                width: isHorizontal ? '60px' : '2px',
                height: isHorizontal ? '2px' : '40px',
                backgroundColor: isCompleted ? '#22C55E' : '#E5E7EB',
                margin: isHorizontal ? '0 8px' : '0 0 0 15px',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
};
