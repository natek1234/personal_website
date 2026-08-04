import { contactLinks } from '../../data/contact';

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-4 py-8 font-body text-sm text-muted-light dark:text-muted-dark">
      <ul className="flex flex-wrap gap-4">
        {contactLinks.map((link) => (
          <li key={link.id}>
            <a href={link.href} aria-label={link.label}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4">© {new Date().getFullYear()} Ketan Vasudeva</p>
    </footer>
  );
}
