import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Search, X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export const TextFieldPreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();

  const getStateStyles = () => {
    if (activeState === 'default') return {};
    const stateStyle = componentConfig.stateStyles[activeState];
    const styles: React.CSSProperties = {};
    if (stateStyle.backgroundColor) styles.background = stateStyle.backgroundColor;
    if (stateStyle.textColor) styles.color = stateStyle.textColor;
    if (stateStyle.borderColor) styles.borderColor = stateStyle.borderColor;
    if (stateStyle.boxShadow) styles.boxShadow = stateStyle.boxShadow;
    return styles;
  };

  const getValidationBorderColor = () => {
    if (componentConfig.inputValidationState === 'error') return '#EF4444';
    if (componentConfig.inputValidationState === 'success') return '#22C55E';
    return componentConfig.borderColor;
  };

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const boxShadow = `${componentConfig.boxShadowInset ? 'inset ' : ''}${componentConfig.boxShadowX}px ${componentConfig.boxShadowY}px ${componentConfig.boxShadowBlur}px ${componentConfig.boxShadowSpread}px ${componentConfig.boxShadowColor}`;

  const inputStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    backgroundColor: componentConfig.backgroundColor,
    color: componentConfig.textColor,
    borderColor: getValidationBorderColor(),
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius,
    opacity: componentConfig.opacity,
    paddingTop: `${componentConfig.paddingTop}px`,
    paddingRight: `${componentConfig.paddingRight}px`,
    paddingBottom: `${componentConfig.paddingBottom}px`,
    paddingLeft: `${componentConfig.paddingLeft}px`,
    width: componentConfig.width === 'auto' ? '280px' : componentConfig.width,
    boxShadow,
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
    outline: 'none',
    ...getStateStyles(),
  };

  if (!componentConfig.visible) return null;

  return (
    <div className="flex flex-col gap-2" style={{ width: componentConfig.width === 'auto' ? '280px' : componentConfig.width }}>
      {componentConfig.label && (
        <label 
          style={{ 
            fontFamily: componentConfig.fontFamily,
            fontSize: `${componentConfig.fontSize * 0.875}px`,
            fontWeight: 500,
            color: componentConfig.textColor === '#FFFFFF' ? '#374151' : componentConfig.textColor,
          }}
        >
          {componentConfig.label}
          {componentConfig.inputRequired && <span style={{ color: '#EF4444', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <input
        type={componentConfig.inputType}
        placeholder={componentConfig.placeholder}
        style={inputStyles}
        disabled={activeState === 'disabled'}
      />
      {componentConfig.inputHelperText && (
        <span style={{ 
          fontSize: `${componentConfig.fontSize * 0.75}px`,
          color: componentConfig.inputValidationState === 'error' ? '#EF4444' 
               : componentConfig.inputValidationState === 'success' ? '#22C55E' 
               : '#6B7280'
        }}>
          {componentConfig.inputHelperText}
        </span>
      )}
    </div>
  );
};

export const TextAreaPreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();

  const getValidationBorderColor = () => {
    if (componentConfig.inputValidationState === 'error') return '#EF4444';
    if (componentConfig.inputValidationState === 'success') return '#22C55E';
    return componentConfig.borderColor;
  };

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const textareaStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    fontWeight: componentConfig.fontWeight,
    backgroundColor: componentConfig.backgroundColor,
    color: componentConfig.textColor,
    borderColor: getValidationBorderColor(),
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius,
    opacity: componentConfig.opacity,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
    width: componentConfig.width === 'auto' ? '320px' : componentConfig.width,
    resize: componentConfig.textareaResize,
    outline: 'none',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  if (!componentConfig.visible) return null;

  return (
    <div className="flex flex-col gap-2" style={{ width: componentConfig.width === 'auto' ? '320px' : componentConfig.width }}>
      {componentConfig.label && (
        <label style={{ 
          fontFamily: componentConfig.fontFamily,
          fontSize: `${componentConfig.fontSize * 0.875}px`,
          fontWeight: 500,
          color: componentConfig.textColor === '#FFFFFF' ? '#374151' : componentConfig.textColor,
        }}>
          {componentConfig.label}
          {componentConfig.inputRequired && <span style={{ color: '#EF4444', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <textarea
        placeholder={componentConfig.placeholder}
        rows={componentConfig.textareaRows}
        style={textareaStyles}
        disabled={activeState === 'disabled'}
      />
    </div>
  );
};

export const PasswordInputPreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();
  const [showPassword, setShowPassword] = useState(false);

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const inputStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    backgroundColor: componentConfig.backgroundColor,
    color: componentConfig.textColor,
    borderColor: componentConfig.borderColor,
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
    width: '100%',
    outline: 'none',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  if (!componentConfig.visible) return null;

  return (
    <div className="flex flex-col gap-2" style={{ width: '280px' }}>
      {componentConfig.label && (
        <label style={{ 
          fontSize: `${componentConfig.fontSize * 0.875}px`,
          fontWeight: 500,
          color: '#374151',
        }}>
          {componentConfig.label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={componentConfig.placeholder}
          style={inputStyles}
          disabled={activeState === 'disabled'}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6B7280',
          }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export const SearchFieldPreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();
  const [value, setValue] = useState('');

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const inputStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    backgroundColor: componentConfig.backgroundColor,
    color: componentConfig.textColor,
    borderColor: componentConfig.borderColor,
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
    width: '100%',
    outline: 'none',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  if (!componentConfig.visible) return null;

  return (
    <div style={{ position: 'relative', width: '320px' }}>
      <Search 
        size={18} 
        style={{ 
          position: 'absolute', 
          left: '14px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          color: '#9CA3AF',
        }} 
      />
      <input
        type="search"
        placeholder={componentConfig.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={inputStyles}
        disabled={activeState === 'disabled'}
      />
      {componentConfig.searchClearable && value && (
        <button
          onClick={() => setValue('')}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6B7280',
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export const NumberInputPreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();
  const [value, setValue] = useState(0);

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const inputStyles: React.CSSProperties = {
    fontFamily: componentConfig.fontFamily,
    fontSize: `${componentConfig.fontSize}px`,
    backgroundColor: componentConfig.backgroundColor,
    color: componentConfig.textColor,
    borderColor: componentConfig.borderColor,
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
    width: '100%',
    textAlign: 'center',
    outline: 'none',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  const buttonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    background: componentConfig.backgroundColor,
    border: `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
    color: componentConfig.textColor === '#FFFFFF' ? '#374151' : componentConfig.textColor,
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 600,
  };

  if (!componentConfig.visible) return null;

  return (
    <div className="flex flex-col gap-2" style={{ width: '160px' }}>
      {componentConfig.label && (
        <label style={{ fontSize: `${componentConfig.fontSize * 0.875}px`, fontWeight: 500, color: '#374151' }}>
          {componentConfig.label}
        </label>
      )}
      <div style={{ display: 'flex', borderRadius, overflow: 'hidden' }}>
        <button 
          style={{ ...buttonStyles, borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius }}
          onClick={() => setValue(v => v - 1)}
          disabled={activeState === 'disabled'}
        >
          −
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ ...inputStyles, borderRadius: 0, borderLeft: 'none', borderRight: 'none' }}
          disabled={activeState === 'disabled'}
        />
        <button 
          style={{ ...buttonStyles, borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius }}
          onClick={() => setValue(v => v + 1)}
          disabled={activeState === 'disabled'}
        >
          +
        </button>
      </div>
    </div>
  );
};

export const FileUploadPreview = () => {
  const { componentConfig, activeState } = useCustomizationStore();
  const [isDragging, setIsDragging] = useState(false);

  const borderRadius = componentConfig.linkBorderRadius
    ? `${componentConfig.borderRadius}px`
    : `${componentConfig.borderTopLeftRadius}px ${componentConfig.borderTopRightRadius}px ${componentConfig.borderBottomRightRadius}px ${componentConfig.borderBottomLeftRadius}px`;

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: isDragging ? '#EFF6FF' : componentConfig.backgroundColor,
    borderColor: isDragging ? '#3B82F6' : componentConfig.borderColor,
    borderWidth: `${componentConfig.borderWidth}px`,
    borderStyle: componentConfig.borderStyle,
    borderRadius,
    padding: `${componentConfig.paddingTop}px ${componentConfig.paddingRight}px ${componentConfig.paddingBottom}px ${componentConfig.paddingLeft}px`,
    cursor: 'pointer',
    transition: `all ${componentConfig.transitionDuration}ms ${componentConfig.transitionEasing}`,
  };

  if (!componentConfig.visible) return null;

  return (
    <div className="flex flex-col gap-2" style={{ width: '320px' }}>
      {componentConfig.label && (
        <label style={{ fontSize: `${componentConfig.fontSize * 0.875}px`, fontWeight: 500, color: '#374151' }}>
          {componentConfig.label}
        </label>
      )}
      <div
        style={containerStyles}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => setIsDragging(false)}
      >
        <div style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '50%', 
          backgroundColor: '#EFF6FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#374151', fontSize: '14px', fontWeight: 500 }}>
            {componentConfig.fileDragDrop ? 'Drag and drop or click to upload' : 'Click to upload'}
          </p>
          <p style={{ margin: '4px 0 0', color: '#6B7280', fontSize: '12px' }}>
            {componentConfig.fileAccept === '*' ? 'Any file type' : componentConfig.fileAccept}
            {componentConfig.fileMultiple && ' • Multiple files'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const RangeSliderPreview = () => {
  const { componentConfig, updateComponentConfig, activeState } = useCustomizationStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateComponentConfig({ sliderValue: Number(e.target.value) });
  };

  if (!componentConfig.visible) return null;

  return (
    <div className="flex flex-col gap-3" style={{ width: '280px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {componentConfig.label && (
          <label style={{ fontSize: `${componentConfig.fontSize * 0.875}px`, fontWeight: 500, color: '#374151' }}>
            {componentConfig.label}
          </label>
        )}
        {componentConfig.sliderShowValue && (
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#3B82F6' }}>
            {componentConfig.sliderValue}
          </span>
        )}
      </div>
      <input
        type="range"
        min={componentConfig.sliderMin}
        max={componentConfig.sliderMax}
        step={componentConfig.sliderStep}
        value={componentConfig.sliderValue}
        onChange={handleChange}
        disabled={activeState === 'disabled'}
        style={{
          width: '100%',
          accentColor: '#3B82F6',
          cursor: activeState === 'disabled' ? 'not-allowed' : 'pointer',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6B7280' }}>
        <span>{componentConfig.sliderMin}</span>
        <span>{componentConfig.sliderMax}</span>
      </div>
    </div>
  );
};

export const ColorPickerPreview = () => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();

  if (!componentConfig.visible) return null;

  return (
    <div className="flex flex-col gap-2">
      {componentConfig.label && (
        <label style={{ fontSize: `${componentConfig.fontSize * 0.875}px`, fontWeight: 500, color: '#374151' }}>
          {componentConfig.label}
        </label>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input
          type="color"
          value={componentConfig.backgroundColor}
          onChange={(e) => updateComponentConfig({ backgroundColor: e.target.value })}
          style={{
            width: '48px',
            height: '48px',
            border: '2px solid #E5E7EB',
            borderRadius: `${componentConfig.borderRadius}px`,
            cursor: 'pointer',
            padding: 0,
          }}
        />
        <span style={{ fontFamily: 'monospace', fontSize: '14px', color: '#374151' }}>
          {componentConfig.backgroundColor.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
