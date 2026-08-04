import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { MobileMenu } from './MobileMenu';

const LINKS = [{ to: '/about', label: 'About' }];

describe('MobileMenu', () => {
  it('is hidden when closed and visible when open', () => {
    const { rerender } = render(
      <MemoryRouter>
        <MobileMenu open={false} onClose={() => {}} links={LINKS} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <MobileMenu open onClose={() => {}} links={LINKS} />
      </MemoryRouter>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <MobileMenu open onClose={onClose} links={LINKS} />
      </MemoryRouter>
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('shows a Publications accordion under Research', () => {
    render(
      <MemoryRouter>
        <MobileMenu open onClose={() => {}} links={[{ to: '/research', label: 'Research' }]} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /publications/i })).toHaveAttribute('href', '/research/publications');
  });
});
