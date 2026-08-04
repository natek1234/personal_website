import { createRef } from 'react';
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
        <MobileMenu open={false} onClose={() => {}} links={LINKS} triggerRef={createRef()} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <MobileMenu open onClose={() => {}} links={LINKS} triggerRef={createRef()} />
      </MemoryRouter>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <MobileMenu open onClose={onClose} links={LINKS} triggerRef={createRef()} />
      </MemoryRouter>
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('restores focus to the trigger element when closed', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    const triggerRef = { current: trigger };
    const onClose = vi.fn();

    const { rerender } = render(
      <MemoryRouter>
        <MobileMenu open onClose={onClose} links={LINKS} triggerRef={triggerRef} />
      </MemoryRouter>
    );

    rerender(
      <MemoryRouter>
        <MobileMenu open={false} onClose={onClose} links={LINKS} triggerRef={triggerRef} />
      </MemoryRouter>
    );

    expect(document.activeElement).toBe(trigger);
    document.body.removeChild(trigger);
  });

  it('Research/Publications is a real collapsible accordion, closed by default', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <MobileMenu open onClose={() => {}} links={[{ to: '/research', label: 'Research' }]} triggerRef={createRef()} />
      </MemoryRouter>
    );

    const toggle = screen.getByRole('button', { name: 'Research' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: /publications/i })).not.toBeInTheDocument();

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /publications/i })).toHaveAttribute('href', '/research/publications');
  });
});
