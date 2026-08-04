import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Contact } from './Contact';
import { contactLinks } from '../data/contact';

describe('Contact', () => {
  it('renders every contact link from data', () => {
    render(
      <HelmetProvider>
        <Contact />
      </HelmetProvider>
    );
    for (const link of contactLinks) {
      const escapedLabel = link.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      expect(screen.getByRole('link', { name: new RegExp(escapedLabel, 'i') })).toHaveAttribute('href', link.href);
    }
  });
});
