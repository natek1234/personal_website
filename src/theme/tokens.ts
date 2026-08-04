export const tokens = {
  light: {
    base: '#FAF6EF',
    text: '#211D1D',
    muted: '#6B6357',
    accent: '#E4572E',
    // Accent used as *text* in light mode. `accent` (#E4572E) only reaches 3.42:1 on
    // `base` (#FAF6EF) — fine for backgrounds/borders/CTAs (non-text UI needs 3:1) but
    // fails WCAG AA for normal text. This darker same-hue coral clears it at 5.05:1.
    accentText: '#B8431F',
  },
  dark: {
    base: '#1B1815',
    text: '#F2ECE3',
    muted: '#B8AE9E',
    accent: '#FF7A54',
  },
} as const;
