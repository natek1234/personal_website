import { SEO } from '../components/SEO';
import { publications } from '../data/publications';
import type { Publication } from '../types/content';

export function PublicationEntry({ publication }: { publication: Publication }) {
  const links = publication.links ?? [];

  return (
    <li className="border-l-2 border-accent-light pl-4 dark:border-accent-dark">
      <p className="text-xs font-medium text-accent-text-light dark:text-accent-dark">{publication.year}</p>
      <h2 className="font-display text-lg">{publication.title}</h2>
      <p className="text-sm text-muted-light dark:text-muted-dark">
        {publication.authors.join(', ')} — {publication.venue}
      </p>
      {links.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-3">
          {links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-accent-text-light underline dark:text-accent-dark"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Publications() {
  const sorted = [...publications].sort((a, b) => b.year - a.year);

  return (
    <>
      <SEO title="Publications & Writing" description="Papers and whitepapers by Ketan Vasudeva." path="/research/publications" />
      <article className="mx-auto max-w-2xl px-4 py-16 font-body">
        <h1 className="mb-6 font-display text-4xl">Publications & Writing</h1>
        <ul className="flex flex-col gap-6">
          {sorted.map((pub) => (
            <PublicationEntry key={pub.id} publication={pub} />
          ))}
        </ul>
      </article>
    </>
  );
}
