import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CONTACT_ICONS } from './ContactIcons';
import type { ContactLink } from '../../types/content';

const ICON_TYPES: ContactLink['icon'][] = ['email', 'github', 'linkedin', 'scholar', 'orcid'];

describe('CONTACT_ICONS', () => {
  it('has an icon component for every ContactLink icon type', () => {
    for (const type of ICON_TYPES) {
      expect(CONTACT_ICONS[type]).toBeDefined();
    }
  });

  it('every icon renders an svg hidden from the accessibility tree', () => {
    for (const type of ICON_TYPES) {
      const Icon = CONTACT_ICONS[type];
      const { container } = render(<Icon />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
