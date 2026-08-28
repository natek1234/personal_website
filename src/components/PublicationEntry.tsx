import { useId, useState } from 'react';
import type { Publication } from '../types/content';
import { LinkIcon } from './icons/LinkIcon';

const SITE_OWNER = 'Ketan Vasudeva';

export function PublicationEntry({ publication }: { publication: Publication }) {
  const links = publication.links ?? [];
  const [pdfOpen, setPdfOpen] = useState(false);
  const pdfPanelId = useId();

  return (
    <li className="border-l-2 border-accent-light pl-4 dark:border-accent-dark">
      <p className="text-xs font-medium text-accent-text-light dark:text-accent-dark">{publication.year}</p>
      <h3 className="font-display text-lg">{publication.title}</h3>
      <p className="text-sm text-muted-light dark:text-muted-dark">
        {publication.authors.map((author, i) => (
          <span key={author}>
            {i > 0 && ', '}
            {author === SITE_OWNER ? <strong className="font-semibold text-ink-light dark:text-ink-dark">{author}</strong> : author}
          </span>
        ))}{' '}
        — {publication.venue}
      </p>
      {publication.description && (
        <p className="mt-1 text-xs text-muted-light dark:text-muted-dark">{publication.description}</p>
      )}
      {(links.length > 0 || publication.pdfUrl) && (
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
                  className="inline-flex items-center gap-1.5 text-accent-text-light underline dark:text-accent-dark"
                >
                  <LinkIcon url={link.url} className="h-4 w-4 shrink-0" />
                  {link.label}
                </a>
              </li>
            );
          })}
          {publication.pdfUrl && (
            <li className="text-sm">
              <button
                type="button"
                onClick={() => setPdfOpen((open) => !open)}
                aria-expanded={pdfOpen}
                aria-controls={pdfPanelId}
                className="text-accent-text-light underline dark:text-accent-dark"
              >
                {pdfOpen ? '▾ Hide PDF' : '▸ View PDF'}
              </button>
            </li>
          )}
        </ul>
      )}
      {publication.pdfUrl && pdfOpen && (
        <div id={pdfPanelId} className="mt-3">
          <object
            data={publication.pdfUrl}
            type="application/pdf"
            title={`${publication.title} PDF`}
            className="h-[70vh] w-full rounded-md border border-muted-light/20 dark:border-muted-dark/20"
          >
            <p className="text-sm">
              Your browser can't display the embedded PDF.{' '}
              <a href={publication.pdfUrl} className="text-accent-text-light underline dark:text-accent-dark">
                Open it directly
              </a>
              .
            </p>
          </object>
        </div>
      )}
    </li>
  );
}
