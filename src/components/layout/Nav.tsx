import { NavLink } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Logo } from '../Logo';
import { useTheme } from '../../theme/ThemeContext';
import { MobileMenu } from './MobileMenu';

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/research', label: 'Research' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/cv', label: 'CV' },
  { to: '/contact', label: 'Contact' },
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-muted-light/20 bg-base-light/90 backdrop-blur dark:border-muted-dark/20 dark:bg-base-dark/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <NavLink to="/" aria-label="Home">
          <Logo className="[&_svg]:h-8 [&_svg]:w-8 text-ink-light dark:text-ink-dark" />
        </NavLink>
        <nav className="hidden gap-6 font-body text-sm md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'text-accent-text-light dark:text-accent-dark' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} aria-label={`Toggle theme, currently ${theme}`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            ref={hamburgerRef}
            className="md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={LINKS} triggerRef={hamburgerRef} />
    </header>
  );
}
