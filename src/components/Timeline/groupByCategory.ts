import type { CVCategory, CVEntry } from '../../types/content';

const CATEGORIES: CVCategory[] = ['education', 'research', 'publications', 'talks', 'grants', 'service'];

export function groupByCategory(entries: CVEntry[]): Record<CVCategory, CVEntry[]> {
  const result = Object.fromEntries(CATEGORIES.map((c) => [c, [] as CVEntry[]])) as Record<CVCategory, CVEntry[]>;

  for (const entry of entries) {
    result[entry.category].push(entry);
  }

  for (const category of CATEGORIES) {
    result[category].sort((a, b) => b.dateRange.start.localeCompare(a.dateRange.start));
  }

  return result;
}
