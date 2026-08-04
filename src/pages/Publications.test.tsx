import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Publications } from './Publications';
import { publications } from '../data/publications';

describe('Publications', () => {
  it('renders every seeded publication', () => {
    render(
      <HelmetProvider>
        <Publications />
      </HelmetProvider>
    );
    for (const pub of publications) {
      expect(screen.getByText(pub.title)).toBeInTheDocument();
    }
  });
});
