import { motion } from 'framer-motion';

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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3 }}
    >
      <p className="font-body text-xs font-medium text-accent-light dark:text-accent-dark">{dateLabel}</p>
      <h3 className="font-display text-lg">{title}</h3>
      {org && <p className="text-sm text-muted-light dark:text-muted-dark">{org}</p>}
      {description && <p className="mt-1 text-sm">{description}</p>}
    </motion.li>
  );
}
