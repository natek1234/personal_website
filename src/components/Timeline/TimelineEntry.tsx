import { motion } from 'framer-motion';

// react-snap crawls the built app with Puppeteer under a "ReactSnap" user-agent and
// serializes the resulting DOM. Entries below the fold never scroll into view during
// that crawl, so their pre-animation `opacity: 0` would be baked into the static HTML
// that ships to users and crawlers before any JS runs. Skip the hidden initial state
// during prerendering so the shipped HTML is fully visible.
const isPrerendering = typeof navigator !== 'undefined' && /ReactSnap/i.test(navigator.userAgent);

export function TimelineEntry({
  title,
  org,
  dateLabel,
  description,
}: {
  title: string;
  org?: string;
  dateLabel: string;
  description?: string;
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
    </motion.li>
  );
}
