import { describe, it, expect } from 'vitest';
import {
  toColorPickerValue,
  computeBorderRadius,
  computeBoxShadow,
  computeBackground,
  computeStateStyles,
} from '@/lib/styleUtils';
import { defaultComponentConfig } from '@/store/useCustomizationStore';

describe('styleUtils', () => {
  it('normalizes 3-digit, 6-digit, rgb(), and invalid colors for native color inputs', () => {
    expect(toColorPickerValue('#abc')).toBe('#aabbcc');
    expect(toColorPickerValue('#1E293B')).toBe('#1E293B');
    expect(toColorPickerValue('rgba(59, 130, 246, 0.5)')).toBe('#3b82f6');
    expect(toColorPickerValue('transparent', '#000000')).toBe('#000000');
  });

  it('computes border radius both linked and unlinked', () => {
    expect(computeBorderRadius({ ...defaultComponentConfig, linkBorderRadius: true, borderRadius: 12 })).toBe('12px');
    expect(
      computeBorderRadius({
        ...defaultComponentConfig,
        linkBorderRadius: false,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 16,
      })
    ).toBe('4px 8px 12px 16px');
  });

  it('computes linear and radial gradient backgrounds', () => {
    expect(
      computeBackground({
        ...defaultComponentConfig,
        useGradient: true,
        gradientType: 'linear',
        gradientAngle: 45,
        gradientStart: '#111111',
        gradientEnd: '#222222',
      })
    ).toBe('linear-gradient(45deg, #111111, #222222)');

    expect(
      computeBackground({
        ...defaultComponentConfig,
        useGradient: true,
        gradientType: 'radial',
        gradientStart: '#111111',
        gradientEnd: '#222222',
      })
    ).toBe('radial-gradient(circle, #111111, #222222)');
  });

  it('computes inset box-shadow and disabled state cursor', () => {
    expect(
      computeBoxShadow({
        ...defaultComponentConfig,
        boxShadowInset: true,
        boxShadowX: 1,
        boxShadowY: 2,
        boxShadowBlur: 4,
        boxShadowSpread: 0,
        boxShadowColor: 'rgba(0,0,0,0.2)',
      })
    ).toBe('inset 1px 2px 4px 0px rgba(0,0,0,0.2)');

    const disabledStyles = computeStateStyles(defaultComponentConfig, 'disabled');
    expect(disabledStyles.cursor).toBe('not-allowed');
  });
});
