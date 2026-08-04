import { describe, it, expect } from 'vitest';
import { tokens } from './tokens';

describe('theme tokens', () => {
  it('defines exact light and dark palette values from the spec', () => {
    expect(tokens.light).toEqual({
      base: '#FAF6EF',
      text: '#211D1D',
      muted: '#6B6357',
      accent: '#E4572E',
      accentText: '#B8431F',
    });
    expect(tokens.dark).toEqual({
      base: '#1B1815',
      text: '#F2ECE3',
      muted: '#B8AE9E',
      accent: '#FF7A54',
    });
  });

  // WCAG 2.1 relative luminance / contrast ratio.
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const luminance = (hex: string) => {
    const h = hex.replace('#', '');
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  };
  const contrast = (a: string, b: string) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };

  it('accent-as-text passes WCAG AA (4.5:1) against its own background in both themes', () => {
    expect(contrast(tokens.light.accentText, tokens.light.base)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(tokens.dark.accent, tokens.dark.base)).toBeGreaterThanOrEqual(4.5);
  });

  it('accent still clears the 3:1 non-text UI threshold for backgrounds/borders', () => {
    expect(contrast(tokens.light.accent, tokens.light.base)).toBeGreaterThanOrEqual(3);
    expect(contrast(tokens.dark.accent, tokens.dark.base)).toBeGreaterThanOrEqual(3);
  });
});
