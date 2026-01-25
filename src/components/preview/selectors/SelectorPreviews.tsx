import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Check, Minus, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

export const CheckboxPreview = () => {
  const { componentConfig, updateComponentConfig, activeState } = useCustomizationStore();

  const handleClick = () => {
    if (activeState !== 'disabled') {
      if (componentConfig.checkboxIndeterminate) {
        updateComponentConfig({ checkboxIndeterminate: false, checkboxChecked: true });
      } else {
        updateComponentConfig({ checkboxChecked: !componentConfig.checkboxChecked });
      }
    }
  };

  const checkboxStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    backgroundColor: componentConfig.checkboxChecked || componentConfig.checkboxIndeterminate 
      ? '#3B82F6' 
      : componentConfig.backgroundColor,
    borderColor: componentConfig.checkboxChecked || componentConfig.checkboxIndeterminate 
      ? '#3B82F6' 
      : componentConfig.borderColor,
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius: `${componentConfig.borderRadius}px`,
    cursor: activeState === 'disabled' ? 'not-allowed' : 'pointer',
    opacity: activeState === 'disabled' ? 0.5 : 1,
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  if (!componentConfig.visible) return null;

  return (
    <div 
      style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <div style={checkboxStyles}>
        {componentConfig.checkboxChecked && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
        {componentConfig.checkboxIndeterminate && !componentConfig.checkboxChecked && (
          <Minus size={14} color="#FFFFFF" strokeWidth={3} />
        )}
      </div>
      <span style={{ 
        fontFamily: componentConfig.fontFamily,
        fontSize: `${componentConfig.fontSize}px`,
        color: activeState === 'disabled' ? '#9CA3AF' : '#374151',
      }}>
        {componentConfig.label}
      </span>
    </div>
  );
};

export const RadioGroupPreview = () => {
  const { componentConfig, updateComponentConfig, activeState } = useCustomizationStore();

  const handleSelect = (index: number) => {
    if (activeState !== 'disabled') {
      updateComponentConfig({ radioSelectedIndex: index });
    }
  };

  if (!componentConfig.visible) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {componentConfig.label && (
        <label style={{ 
          fontSize: `${componentConfig.fontSize * 0.875}px`, 
          fontWeight: 500, 
          color: '#374151' 
        }}>
          {componentConfig.label}
        </label>
      )}
      {componentConfig.radioOptions.map((option, index) => (
        <div
          key={index}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => handleSelect(index)}
        >
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: `2px solid ${componentConfig.radioSelectedIndex === index ? '#3B82F6' : '#D1D5DB'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
            cursor: activeState === 'disabled' ? 'not-allowed' : 'pointer',
            opacity: activeState === 'disabled' ? 0.5 : 1,
          }}>
            {componentConfig.radioSelectedIndex === index && (
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: '#3B82F6' 
              }} />
            )}
          </div>
          <span style={{ 
            fontSize: `${componentConfig.fontSize}px`,
            color: activeState === 'disabled' ? '#9CA3AF' : '#374151',
          }}>
            {option}
          </span>
        </div>
      ))}
    </div>
  );
};

export const SwitchPreview = () => {
  const { componentConfig, updateComponentConfig, activeState } = useCustomizationStore();

  const handleToggle = () => {
    if (activeState !== 'disabled') {
      updateComponentConfig({ switchChecked: !componentConfig.switchChecked });
    }
  };

  const sizes = {
    sm: { width: 36, height: 20, thumb: 16 },
    md: { width: 44, height: 24, thumb: 20 },
    lg: { width: 52, height: 28, thumb: 24 },
  };

  const size = sizes[componentConfig.switchSize];

  const trackStyles: React.CSSProperties = {
    position: 'relative',
    width: `${size.width}px`,
    height: `${size.height}px`,
    backgroundColor: componentConfig.switchChecked ? '#3B82F6' : '#D1D5DB',
    borderRadius: `${size.height}px`,
    cursor: activeState === 'disabled' ? 'not-allowed' : 'pointer',
    opacity: activeState === 'disabled' ? 0.5 : 1,
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  const thumbStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: componentConfig.switchChecked ? `${size.width - size.thumb - 2}px` : '2px',
    width: `${size.thumb}px`,
    height: `${size.thumb}px`,
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  if (!componentConfig.visible) return null;

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        flexDirection: componentConfig.switchLabelPosition === 'left' ? 'row-reverse' : 'row',
      }}
    >
      <div style={trackStyles} onClick={handleToggle}>
        <div style={thumbStyles} />
      </div>
      <span style={{ 
        fontSize: `${componentConfig.fontSize}px`,
        color: activeState === 'disabled' ? '#9CA3AF' : '#374151',
      }}>
        {componentConfig.label}
      </span>
    </div>
  );
};

export const DropdownPreview = () => {
  const { componentConfig, updateComponentConfig, activeState } = useCustomizationStore();
  const [isOpen, setIsOpen] = useState(false);

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const triggerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '280px',
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    backgroundColor: componentConfig.backgroundColor,
    color: componentConfig.dropdownSelectedIndex >= 0 ? componentConfig.textColor : '#9CA3AF',
    borderColor: isOpen ? '#3B82F6' : componentConfig.borderColor,
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
    cursor: activeState === 'disabled' ? 'not-allowed' : 'pointer',
    opacity: activeState === 'disabled' ? 0.5 : 1,
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  if (!componentConfig.visible) return null;

  return (
    <div style={{ position: 'relative', width: '280px' }}>
      {componentConfig.label && (
        <label style={{ 
          display: 'block',
          marginBottom: '8px',
          fontSize: `${componentConfig.fontSize * 0.875}px`, 
          fontWeight: 500, 
          color: '#374151' 
        }}>
          {componentConfig.label}
        </label>
      )}
      <div 
        style={triggerStyles}
        onClick={() => activeState !== 'disabled' && setIsOpen(!isOpen)}
      >
        <span>
          {componentConfig.dropdownSelectedIndex >= 0 
            ? componentConfig.dropdownOptions[componentConfig.dropdownSelectedIndex]
            : componentConfig.dropdownPlaceholder}
        </span>
        <ChevronDown 
          size={18} 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: `transform ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
            color: '#6B7280',
          }} 
        />
      </div>
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          backgroundColor: '#FFFFFF',
          borderRadius,
          border: '1px solid #E5E7EB',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          zIndex: 50,
        }}>
          {componentConfig.dropdownOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                updateComponentConfig({ dropdownSelectedIndex: index });
                setIsOpen(false);
              }}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                backgroundColor: componentConfig.dropdownSelectedIndex === index ? '#EFF6FF' : 'transparent',
                color: componentConfig.dropdownSelectedIndex === index ? '#3B82F6' : '#374151',
                fontSize: `${componentConfig.fontSize}px`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = componentConfig.dropdownSelectedIndex === index ? '#EFF6FF' : 'transparent'}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const AutocompletePreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = componentConfig.dropdownOptions.filter(option =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const inputStyles: React.CSSProperties = {
    width: '100%',
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    backgroundColor: componentConfig.backgroundColor,
    color: componentConfig.textColor,
    borderColor: isOpen ? '#3B82F6' : componentConfig.borderColor,
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px 40px`,
    outline: 'none',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  if (!componentConfig.visible) return null;

  return (
    <div style={{ position: 'relative', width: '280px' }}>
      {componentConfig.label && (
        <label style={{ 
          display: 'block',
          marginBottom: '8px',
          fontSize: `${componentConfig.fontSize * 0.875}px`, 
          fontWeight: 500, 
          color: '#374151' 
        }}>
          {componentConfig.label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <Search 
          size={18} 
          style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#9CA3AF',
          }} 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={componentConfig.placeholder}
          style={inputStyles}
          disabled={activeState === 'disabled'}
        />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          backgroundColor: '#FFFFFF',
          borderRadius,
          border: '1px solid #E5E7EB',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          maxHeight: '200px',
          overflow: 'auto',
          zIndex: 50,
        }}>
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setQuery(option);
                setIsOpen(false);
              }}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                fontSize: `${componentConfig.fontSize}px`,
                color: '#374151',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
