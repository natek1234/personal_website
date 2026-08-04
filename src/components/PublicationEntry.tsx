import type { Publication } from '../types/content';

export function PublicationEntry({ publication }: { publication: Publication }) {
  const links = publication.links ?? [];

  return (
    <li className="border-l-2 border-accent-light pl-4 dark:border-accent-dark">
      <p className="text-xs font-medium text-accent-text-light dark:text-accent-dark">{publication.year}</p>
      <h3 className="font-display text-lg">{publication.title}</h3>
      <p className="text-sm text-muted-light dark:text-muted-dark">
        {publication.authors.join(', ')} — {publication.venue}
      </p>
      {publication.description && (
        <p className="mt-1 text-xs text-muted-light dark:text-muted-dark">{publication.description}</p>
      )}
      {links.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-3">
          {links.map((link) => {
            const isDoi = link.url.startsWith('https://doi.org/');
            return (
              <li key={link.url} className="text-sm text-muted-light dark:text-muted-dark">
                {isDoi && 'DOI: '}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-text-light underline dark:text-accent-dark"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
