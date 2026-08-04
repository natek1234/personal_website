import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders an accessible svg logo', () => {
    render(<Logo />);
    expect(screen.getByRole('img', { name: /ketan vasudeva logo/i })).toBeInTheDocument();
  });
});
