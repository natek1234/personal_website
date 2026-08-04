import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders an accessible svg logo', () => {
    render(<Logo />);
    expect(screen.getByRole('img', { name: /ketan vasudeva logo/i })).toBeInTheDocument();
  });

  it('themes the traced fill to currentColor instead of the hardcoded trace color', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.outerHTML).toContain('fill="currentColor"');
    expect(svg?.outerHTML).not.toContain('fill="black"');
  });
});
