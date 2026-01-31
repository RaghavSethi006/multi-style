import { useState, useRef, useEffect, useCallback } from 'react';
import { useCustomizationStore, ComponentConfig } from '@/store/useCustomizationStore';

type ConfigKey = keyof ComponentConfig;

export const useInlineEdit = (configKey: ConfigKey) => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(componentConfig[configKey] || ''));
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(String(componentConfig[configKey] || ''));
  }, [componentConfig, configKey]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const stopEditing = useCallback(() => {
    setIsEditing(false);
    if (editValue !== String(componentConfig[configKey])) {
      updateComponentConfig({ [configKey]: editValue } as Partial<typeof componentConfig>);
    }
  }, [editValue, componentConfig, configKey, updateComponentConfig]);

  const cancelEditing = useCallback(() => {
    setEditValue(String(componentConfig[configKey] || ''));
    setIsEditing(false);
  }, [componentConfig, configKey]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
      stopEditing();
    }
    if (e.key === 'Escape') {
      cancelEditing();
    }
  }, [stopEditing, cancelEditing]);

  return {
    isEditing,
    editValue,
    setEditValue,
    inputRef,
    startEditing,
    stopEditing,
    cancelEditing,
    handleKeyDown,
  };
};

// Inline edit styles helper
export const getInlineEditStyles = (baseStyles: React.CSSProperties): React.CSSProperties => ({
  ...baseStyles,
  border: '2px solid hsl(var(--primary))',
  borderRadius: '4px',
  padding: '4px 8px',
  background: 'transparent',
  outline: 'none',
  minWidth: '60px',
});
