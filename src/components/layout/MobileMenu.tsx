import { useEffect, useRef, type RefObject } from 'react';
import { NavLink } from 'react-router-dom';

type Link = { to: string; label: string };

export function MobileMenu({
  open,
  onClose,
  links,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  links: Link[];
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeButtonRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col gap-6 bg-base-light p-6 font-body dark:bg-base-dark">
      <button ref={closeButtonRef} onClick={onClose} aria-label="Close menu" className="self-end text-xl">
        ✕
      </button>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} onClick={onClose}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
