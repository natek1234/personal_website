import { useEffect, useRef, type RefObject } from 'react';
import { createPortal } from 'react-dom';
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

  // Portaled to <body>: Nav's header uses backdrop-blur, and backdrop-filter makes an
  // element the containing block for its position:fixed descendants (same as `transform`
  // or `filter`), which shrank this dialog's `inset-0` to the header's own ~72px box
  // instead of the viewport. Rendering outside that DOM subtree sidesteps it.
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col gap-6 bg-base-light p-6 font-body dark:bg-base-dark">
      <button ref={closeButtonRef} onClick={onClose} aria-label="Close menu" className="self-end text-xl">
        ✕
      </button>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} onClick={onClose}>
          {link.label}
        </NavLink>
      ))}
    </div>,
    document.body
  );
}
