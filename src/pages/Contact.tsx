import { SEO } from '../components/SEO';
import { contactLinks } from '../data/contact';

export function Contact() {
  return (
    <>
      <SEO title="Contact" description="Get in touch with Ketan Vasudeva." path="/contact" />
      <article className="mx-auto max-w-xl px-4 py-16 font-body">
        <h1 className="mb-8 font-display text-4xl">Contact</h1>
        <ul className="flex flex-col gap-4">
          {contactLinks.map((link) => (
            <li key={link.id}>
              <a href={link.href} className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-muted-light dark:text-muted-dark">{link.label}</span>
                <span className="text-lg text-accent-light dark:text-accent-dark">{link.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
