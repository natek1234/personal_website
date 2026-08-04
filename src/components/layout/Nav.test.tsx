import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../../theme/ThemeContext';
import { Nav } from './Nav';

function renderNav(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ThemeProvider>
        <Nav />
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('Nav', () => {
  it('renders links to every top-level page', () => {
    renderNav('/');
    for (const [name, href] of [
      ['Home', '/'],
      ['About', '/about'],
      ['Research', '/research'],
      ['Projects', '/projects'],
      ['Resume', '/resume'],
      ['CV', '/cv'],
      ['Contact', '/contact'],
    ]) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
    }
  });

  it('marks the current route with aria-current', () => {
    renderNav('/research');
    expect(screen.getByRole('link', { name: 'Research' })).toHaveAttribute('aria-current', 'page');
  });

  it('only marks Home as current on the root path, not on every route', () => {
    renderNav('/about');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  });

  it('toggles the theme when the theme button is clicked', () => {
    renderNav('/');
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    fireEvent.click(button);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
