import { contactLinks } from '../../data/contact';
import { CONTACT_ICONS } from '../icons/ContactIcons';

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-4 py-8 font-body text-sm text-muted-light dark:text-muted-dark">
      <ul className="flex flex-wrap gap-5">
        {contactLinks.map((link) => {
          const Icon = CONTACT_ICONS[link.icon];
          return (
            <li key={link.id}>
              <a href={link.href} className="flex items-center gap-1.5 hover:text-accent-text-light dark:hover:text-accent-dark">
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-center">© {new Date().getFullYear()} Ketan Vasudeva</p>
    </footer>
  );
}
