import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { Home } from './Home';

function renderHome() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('Home', () => {
  it('renders the hero heading and positioning statement', () => {
    renderHome();
    expect(screen.getByRole('heading', { level: 1, name: /ketan vasudeva/i })).toBeInTheDocument();
    expect(screen.getByText(/space robotics engineer/i)).toBeInTheDocument();
  });

  it('renders a headshot image', () => {
    renderHome();
    expect(screen.getByRole('img', { name: 'Ketan Vasudeva' })).toHaveAttribute('src', '/images/headshot.jpg');
  });

  it('renders 6 teaser tiles linking to About, Research, Projects, Resume, CV, Contact — matching the nav bar order', () => {
    renderHome();
    for (const [name, href] of [
      ['About', '/about'],
      ['Research', '/research'],
      ['Projects', '/projects'],
      ['Resume', '/resume'],
      ['CV', '/cv'],
      ['Contact', '/contact'],
    ]) {
      expect(screen.getByRole('link', { name: new RegExp(name, 'i') })).toHaveAttribute('href', href);
    }
  });
});
