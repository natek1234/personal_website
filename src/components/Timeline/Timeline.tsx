import type { CVCategory, CVEntry, Project } from '../../types/content';
import { TimelineEntry } from './TimelineEntry';
import { groupByCategory } from './groupByCategory';

type FlatProps = { mode: 'flat'; items: Project[] };
type GroupedProps = { mode: 'grouped'; items: CVEntry[] };

const CATEGORY_LABELS: Record<CVCategory, string> = {
  education: 'Education',
  work: 'Work Experience',
  research: 'Research',
  publications: 'Publications',
  talks: 'Talks',
  awards: 'Awards & Achievements',
  grants: 'Grants & Proposals',
  service: 'Service',
};

function dateLabel(range: { start: string; end?: string }) {
  if (!range.end) return `${range.start} — Present`;
  if (range.end === range.start) return range.start;
  return `${range.start} — ${range.end}`;
}

export function Timeline(props: FlatProps | GroupedProps) {
  if (props.mode === 'flat') {
    const sorted = [...props.items].sort((a, b) => b.dateRange.start.localeCompare(a.dateRange.start));
    return (
      <ul className="flex flex-col gap-8">
        {sorted.map((item) => (
          <TimelineEntry
            key={item.id}
            title={item.title}
            org={item.role}
            dateLabel={dateLabel(item.dateRange)}
            description={item.summary}
            bullets={item.bullets}
            links={item.links}
          />
        ))}
      </ul>
    );
  }

  const grouped = groupByCategory(props.items);
  return (
    <div className="flex flex-col gap-10">
      {(Object.entries(grouped) as [CVCategory, CVEntry[]][])
        .filter(([, entries]) => entries.length > 0)
        .map(([category, entries]) => (
          <section key={category}>
            <h2 className="mb-4 font-display text-2xl">{CATEGORY_LABELS[category]}</h2>
            <ul className="flex flex-col gap-6">
              {entries.map((entry) => (
                <TimelineEntry
                  key={entry.id}
                  title={entry.title}
                  org={entry.org}
                  dateLabel={dateLabel(entry.dateRange)}
                  description={entry.description}
                  bullets={entry.bullets}
                />
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
