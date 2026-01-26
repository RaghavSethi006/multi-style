import { useCustomizationStore } from '@/store/useCustomizationStore';
import { GripVertical, Move } from 'lucide-react';
import { useState } from 'react';

export const DragDropPreview = () => {
  const { componentConfig } = useCustomizationStore();
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      width: '300px',
      backgroundColor: componentConfig.backgroundColor,
      borderRadius: `${componentConfig.borderRadius}px`,
      border: `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: `1px solid ${componentConfig.borderColor}`,
        fontSize: '14px',
        fontWeight: 600,
        color: '#374151',
      }}>
        Drag to reorder
      </div>
      {items.map((item, index) => (
        <div
          key={item}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: draggedIndex === index ? '#EFF6FF' : '#FFFFFF',
            borderBottom: index < items.length - 1 ? `1px solid ${componentConfig.borderColor}` : 'none',
            cursor: 'grab',
            transition: 'background-color 150ms ease',
            fontSize: `${componentConfig.fontSize}px`,
            color: '#374151',
          }}
        >
          <GripVertical size={16} style={{ color: '#9CA3AF' }} />
          {item}
        </div>
      ))}
    </div>
  );
};

export const SplitPanePreview = () => {
  const { componentConfig } = useCustomizationStore();
  const [splitPosition, setSplitPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = e.currentTarget as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSplitPosition(Math.max(20, Math.min(80, newPosition)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!componentConfig.visible) return null;

  return (
    <div
      style={{
        width: '400px',
        height: '250px',
        display: 'flex',
        border: `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
        borderRadius: `${componentConfig.borderRadius}px`,
        overflow: 'hidden',
        userSelect: isDragging ? 'none' : 'auto',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div style={{
        width: `${splitPosition}%`,
        backgroundColor: '#F9FAFB',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        color: '#6B7280',
      }}>
        Left Panel
      </div>
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: '8px',
          backgroundColor: '#E5E7EB',
          cursor: 'col-resize',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: '4px',
          height: '40px',
          backgroundColor: '#9CA3AF',
          borderRadius: '2px',
        }} />
      </div>
      <div style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        color: '#6B7280',
      }}>
        Right Panel
      </div>
    </div>
  );
};

export const CodeEditorPreview = () => {
  const { componentConfig } = useCustomizationStore();
  const [code, setCode] = useState(
    `function greeting(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greeting("World"));`
  );

  const lines = code.split('\n');

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      width: '400px',
      backgroundColor: '#1E1E1E',
      borderRadius: `${componentConfig.borderRadius}px`,
      overflow: 'hidden',
      fontFamily: 'Monaco, Menlo, monospace',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        backgroundColor: '#2D2D2D',
        borderBottom: '1px solid #3E3E42',
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F57' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28C840' }} />
        <span style={{ marginLeft: '8px', color: '#9CA3AF', fontSize: '12px' }}>
          {componentConfig.codeLanguage || 'javascript'}
        </span>
      </div>
      <div style={{
        display: 'flex',
        padding: '16px',
        fontSize: '13px',
        lineHeight: 1.6,
      }}>
        <div style={{
          color: '#6B7280',
          paddingRight: '16px',
          textAlign: 'right',
          userSelect: 'none',
        }}>
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#D4D4D4',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            resize: 'none',
          }}
          rows={lines.length}
        />
      </div>
    </div>
  );
};

export const ChartPreview = () => {
  const { componentConfig } = useCustomizationStore();

  const data = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 45 },
    { label: 'Mar', value: 78 },
    { label: 'Apr', value: 52 },
    { label: 'May', value: 90 },
    { label: 'Jun', value: 68 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  if (!componentConfig.visible) return null;

  return (
    <div style={{
      width: '400px',
      padding: '20px',
      backgroundColor: componentConfig.backgroundColor,
      borderRadius: `${componentConfig.borderRadius}px`,
      border: `${componentConfig.borderWidth}px ${componentConfig.borderStyle} ${componentConfig.borderColor}`,
    }}>
      <h4 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 600, color: '#111827' }}>
        Monthly Sales
      </h4>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '150px',
        gap: '8px',
        paddingBottom: '24px',
        borderBottom: '1px solid #E5E7EB',
      }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
            <div style={{
              width: '100%',
              maxWidth: '40px',
              height: `${(item.value / maxValue) * 120}px`,
              backgroundColor: '#3B82F6',
              borderRadius: '4px 4px 0 0',
              transition: 'height 300ms ease',
            }} />
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '8px',
      }}>
        {data.map((item, index) => (
          <span key={index} style={{ fontSize: '12px', color: '#6B7280', flex: 1, textAlign: 'center' }}>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};
