import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders all 6 contact links from data', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /email \(personal\)/i })).toHaveAttribute('href', 'mailto:ketanvasudeva@gmail.com');
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/natek1234');
    expect(screen.getByRole('link', { name: /orcid/i })).toHaveAttribute('href', 'https://orcid.org/0009-0009-4647-4299');
  });
});
