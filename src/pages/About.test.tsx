import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { About } from './About';

describe('About', () => {
  it('renders the bio narrative with skills folded in, not as a separate tag list', () => {
    render(
      <HelmetProvider>
        <About />
      </HelmetProvider>
    );
    expect(screen.getByRole('heading', { level: 1, name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: /skills/i })).not.toBeInTheDocument();
  });

  it('renders a headshot image', () => {
    render(
      <HelmetProvider>
        <About />
      </HelmetProvider>
    );
    expect(screen.getByRole('img', { name: 'Ketan Vasudeva' })).toHaveAttribute('src', '/images/headshot.jpg');
  });
});
