import type { CSSProperties } from 'react';
import type { ComponentConfig, ComponentState } from '@/store/useCustomizationStore';

/**
 * Normalizes a CSS color string for native <input type="color"> (which requires #rrggbb).
 */
export function toColorPickerValue(color: string, fallback = '#3B82F6'): string {
  if (!color) return fallback;
  const trimmed = color.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
    return trimmed;
  }
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const r = trimmed[1];
    const g = trimmed[2];
    const b = trimmed[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  const rgbaMatch = trimmed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbaMatch) {
    const toHex = (n: string) =>
      Math.max(0, Math.min(255, Number(n)))
        .toString(16)
        .padStart(2, '0');
    return `#${toHex(rgbaMatch[1])}${toHex(rgbaMatch[2])}${toHex(rgbaMatch[3])}`;
  }
  return fallback;
}

export function computeBoxShadow(config: ComponentConfig): string {
  const inset = config.boxShadowInset ? 'inset ' : '';
  return `${inset}${config.boxShadowX}px ${config.boxShadowY}px ${config.boxShadowBlur}px ${config.boxShadowSpread}px ${config.boxShadowColor}`;
}

export function computeBorderRadius(config: ComponentConfig): string {
  if (config.linkBorderRadius) {
    return `${config.borderRadius}px`;
  }
  return `${config.borderTopLeftRadius}px ${config.borderTopRightRadius}px ${config.borderBottomRightRadius}px ${config.borderBottomLeftRadius}px`;
}

export function computeBackground(config: ComponentConfig): string {
  if (config.useGradient) {
    return config.gradientType === 'linear'
      ? `linear-gradient(${config.gradientAngle}deg, ${config.gradientStart}, ${config.gradientEnd})`
      : `radial-gradient(circle, ${config.gradientStart}, ${config.gradientEnd})`;
  }
  return config.backgroundColor;
}

export function computeGlassmorphismStyles(config: ComponentConfig): CSSProperties {
  if (!config.glassmorphism) return {};
  return {
    backdropFilter: `blur(${config.glassBlur}px)`,
    WebkitBackdropFilter: `blur(${config.glassBlur}px)`,
    background: `rgba(255, 255, 255, ${config.glassOpacity})`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };
}

export function computeStateStyles(
  config: ComponentConfig,
  activeState: ComponentState
): CSSProperties {
  if (activeState === 'default') return {};
  const stateStyle = config.stateStyles[activeState];
  if (!stateStyle) return {};

  const styles: CSSProperties = {};
  if (stateStyle.backgroundColor) {
    styles.background = stateStyle.backgroundColor;
    styles.backgroundColor = stateStyle.backgroundColor;
  }
  if (stateStyle.textColor) styles.color = stateStyle.textColor;
  if (stateStyle.borderColor) styles.borderColor = stateStyle.borderColor;
  if (stateStyle.boxShadow) styles.boxShadow = stateStyle.boxShadow;
  if (activeState === 'disabled') {
    styles.cursor = 'not-allowed';
  }
  return styles;
}
