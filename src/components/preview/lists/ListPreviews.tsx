import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Check } from 'lucide-react';
import { getLucideIcon } from '@/lib/icons';

export const SimpleListPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const getListStyle = () => {
    switch (componentConfig.listStyleType) {
      case 'disc': return 'disc';
      case 'decimal': return 'decimal';
      case 'circle': return 'circle';
      case 'square': return 'square';
      default: return 'none';
    }
  };

  if (!componentConfig.visible) return null;

  const ListTag = componentConfig.listStyleType === 'decimal' ? 'ol' : 'ul';

  return (
    <ListTag style={{
      margin: 0,
      paddingLeft: componentConfig.listStyleType === 'none' ? 0 : '24px',
      listStyleType: getListStyle(),
      fontFamily: componentConfig.fontFamily,
      fontSize: `${componentConfig.fontSize}px`,
      lineHeight: componentConfig.lineHeight,
      color: componentConfig.textColor,
    }}>
      {componentConfig.listItems.map((item, index) => (
        <li key={index} style={{ marginBottom: '8px' }}>
          {item}
        </li>
      ))}
    </ListTag>
  );
};

export const IconListPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const IconComponent = getLucideIcon(componentConfig.listIconName) ?? Check;

  if (!componentConfig.visible) return null;

  return (
    <ul style={{
      margin: 0,
      padding: 0,
      listStyle: 'none',
      fontFamily: componentConfig.fontFamily,
      fontSize: `${componentConfig.fontSize}px`,
      lineHeight: componentConfig.lineHeight,
      color: componentConfig.textColor,
    }}>
      {componentConfig.listItems.map((item, index) => (
        <li key={index} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '12px',
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            backgroundColor: '#EFF6FF',
            borderRadius: '50%',
          }}>
            {IconComponent && <IconComponent size={14} style={{ color: '#3B82F6' }} />}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
};

export const CheckboxListPreview = () => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();

  const toggleItem = (index: number) => {
    const newChecked = componentConfig.listCheckedItems.includes(index)
      ? componentConfig.listCheckedItems.filter(i => i !== index)
      : [...componentConfig.listCheckedItems, index];
    updateComponentConfig({ listCheckedItems: newChecked });
  };

  if (!componentConfig.visible) return null;

  return (
    <ul style={{
      margin: 0,
      padding: 0,
      listStyle: 'none',
      fontFamily: componentConfig.fontFamily,
      fontSize: `${componentConfig.fontSize}px`,
      color: componentConfig.textColor,
    }}>
      {componentConfig.listItems.map((item, index) => {
        const isChecked = componentConfig.listCheckedItems.includes(index);
        return (
          <li 
            key={index} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              marginBottom: '12px',
              cursor: 'pointer',
            }}
            onClick={() => toggleItem(index)}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              backgroundColor: isChecked ? '#3B82F6' : '#FFFFFF',
              border: `2px solid ${isChecked ? '#3B82F6' : '#D1D5DB'}`,
              borderRadius: '4px',
              transition: 'all 150ms ease',
            }}>
              {isChecked && <Check size={14} style={{ color: '#FFFFFF' }} strokeWidth={3} />}
            </span>
            <span style={{
              textDecoration: isChecked ? 'line-through' : 'none',
              color: isChecked ? '#9CA3AF' : componentConfig.textColor,
            }}>
              {item}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export const OrderedListPreview = () => {
  const { componentConfig } = useCustomizationStore();

  if (!componentConfig.visible) return null;

  return (
    <ol style={{
      margin: 0,
      padding: 0,
      listStyle: 'none',
      fontFamily: componentConfig.fontFamily,
      fontSize: `${componentConfig.fontSize}px`,
      lineHeight: componentConfig.lineHeight,
      color: componentConfig.textColor,
      counterReset: 'list-counter',
    }}>
      {componentConfig.listItems.map((item, index) => (
        <li 
          key={index} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '12px',
            counterIncrement: 'list-counter',
          }}
        >
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            backgroundColor: '#3B82F6',
            borderRadius: '50%',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 600,
          }}>
            {index + 1}
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
};
