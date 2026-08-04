import { SEO } from '../components/SEO';
import { contactLinks } from '../data/contact';
import { CONTACT_ICONS } from '../components/icons/ContactIcons';

export function Contact() {
  return (
    <>
      <SEO title="Contact" description="Get in touch with Ketan Vasudeva." path="/contact" />
      <article className="mx-auto max-w-xl px-4 py-16 font-body">
        <h1 className="mb-8 font-display text-4xl">Contact</h1>
        <ul className="flex flex-col gap-4">
          {contactLinks.map((link) => {
            const Icon = CONTACT_ICONS[link.icon];
            return (
              <li key={link.id}>
                <a href={link.href} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-light/10 text-accent-text-light dark:bg-accent-dark/10 dark:text-accent-dark">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-muted-light dark:text-muted-dark">{link.label}</span>
                    <span className="text-lg text-accent-text-light dark:text-accent-dark">{link.value}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </article>
    </>
  );
}
