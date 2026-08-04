import { useEffect, useRef, useState, type RefObject } from 'react';
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
  const [researchExpanded, setResearchExpanded] = useState(false);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeButtonRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      setResearchExpanded(false);
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
      {links.map((link) =>
        link.label === 'Research' ? (
          <div key={link.to} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <NavLink to={link.to} onClick={onClose}>
                {link.label}
              </NavLink>
              <button
                aria-expanded={researchExpanded}
                aria-label="Research"
                onClick={() => setResearchExpanded((v) => !v)}
              >
                {researchExpanded ? '▲' : '▼'}
              </button>
            </div>
            {researchExpanded && (
              <NavLink to={`${link.to}/publications`} onClick={onClose} className="pl-4 text-muted-light dark:text-muted-dark">
                Publications
              </NavLink>
            )}
          </div>
        ) : (
          <NavLink key={link.to} to={link.to} onClick={onClose}>
            {link.label}
          </NavLink>
        )
      )}
    </div>
  );
}
