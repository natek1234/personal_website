import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { CV } from './CV';

describe('CV', () => {
  it('renders category section headings present in the seed data', () => {
    render(
      <HelmetProvider>
        <CV />
      </HelmetProvider>
    );
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Research' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Publications' })).toBeInTheDocument();
  });
});
