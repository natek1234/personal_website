import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Research } from './Research';

describe('Research', () => {
  it('credits the PI and links to Publications', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Research />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(/Jekan Thanga/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /publications/i })).toHaveAttribute('href', '/research/publications');
  });
});
