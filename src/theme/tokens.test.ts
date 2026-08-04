import { describe, it, expect } from 'vitest';
import { tokens } from './tokens';

describe('theme tokens', () => {
  it('defines exact light and dark palette values from the spec', () => {
    expect(tokens.light).toEqual({
      base: '#FAF6EF',
      text: '#211D1D',
      muted: '#6B6357',
      accent: '#E4572E',
    });
    expect(tokens.dark).toEqual({
      base: '#1B1815',
      text: '#F2ECE3',
      muted: '#B8AE9E',
      accent: '#FF7A54',
    });
  });
});
