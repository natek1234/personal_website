import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { ThemeProvider } from './theme/ThemeContext';

describe('App', () => {
  it('renders the Home route by default', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
  });
});
