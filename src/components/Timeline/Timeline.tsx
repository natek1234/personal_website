import type { CVEntry, Project } from '../../types/content';
import { TimelineEntry } from './TimelineEntry';
import { groupByCategory } from './groupByCategory';

type FlatProps = { mode: 'flat'; items: Project[] };
type GroupedProps = { mode: 'grouped'; items: CVEntry[] };

const CATEGORY_LABELS: Record<string, string> = {
  education: 'Education',
  research: 'Research',
  publications: 'Publications',
  talks: 'Talks',
  grants: 'Grants & Proposals',
  service: 'Service',
};

function dateLabel(range: { start: string; end?: string }) {
  return range.end ? `${range.start} — ${range.end}` : `${range.start} — Present`;
}

export function Timeline(props: FlatProps | GroupedProps) {
  if (props.mode === 'flat') {
    const sorted = [...props.items].sort((a, b) => b.dateRange.start.localeCompare(a.dateRange.start));
    return (
      <ul className="flex flex-col gap-8">
        {sorted.map((item) => (
          <TimelineEntry key={item.id} title={item.title} dateLabel={dateLabel(item.dateRange)} description={item.summary} />
        ))}
      </ul>
    );
  }

  const grouped = groupByCategory(props.items);
  return (
    <div className="flex flex-col gap-10">
      {Object.entries(grouped)
        .filter(([, entries]) => entries.length > 0)
        .map(([category, entries]) => (
          <section key={category}>
            <h2 className="mb-4 font-display text-2xl">{CATEGORY_LABELS[category]}</h2>
            <ul className="flex flex-col gap-6">
              {entries.map((entry) => (
                <TimelineEntry key={entry.id} title={entry.title} org={entry.org} dateLabel={dateLabel(entry.dateRange)} description={entry.description} />
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
