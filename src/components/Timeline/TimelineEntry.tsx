import { motion } from 'framer-motion';
import type { Bullet } from '../../types/content';
import { LinkIcon } from '../icons/LinkIcon';

// scripts/prerender.mjs renders this component tree server-side in plain Node (no browser,
// no `window`), where entries below the fold never get a chance to scroll into view — so
// their pre-animation `opacity: 0` would otherwise be baked into the static HTML that ships
// to users and crawlers before any JS runs. Skip the hidden initial state during SSR so the
// shipped HTML is fully visible; real browsers (where `window` exists, including once the
// client hydrates) get the normal scroll-triggered entrance animation.
const isPrerendering = typeof window === 'undefined';

export function TimelineEntry({
  title,
  org,
  dateLabel,
  description,
  bullets,
  links,
}: {
  title: string;
  org?: string;
  dateLabel: string;
  description?: string;
  bullets?: Bullet[];
  links?: { label: string; url: string }[];
}) {
  return (
    <motion.li
      className="border-l-2 border-accent-light pl-4 dark:border-accent-dark"
      initial={isPrerendering ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3 }}
    >
      <p className="font-body text-xs font-medium text-accent-text-light dark:text-accent-dark">{dateLabel}</p>
      <h3 className="font-display text-lg">{title}</h3>
      {org && <p className="text-sm text-muted-light dark:text-muted-dark">{org}</p>}
      {description && <p className="mt-1 text-sm">{description}</p>}
      {bullets && bullets.length > 0 && (
        <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm">
          {bullets.map((bullet, i) =>
            typeof bullet === 'string' ? (
              <li key={i}>{bullet}</li>
            ) : (
              <li key={i}>
                <a
                  href={bullet.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-text-light underline dark:text-accent-dark"
                >
                  {bullet.text}
                </a>
              </li>
            )
          )}
        </ul>
      )}
      {links && links.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-3">
          {links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent-text-light underline dark:text-accent-dark"
              >
                <LinkIcon url={link.url} className="h-4 w-4 shrink-0" />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.li>
  );
}
