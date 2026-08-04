import { SEO } from '../components/SEO';
import { Timeline } from '../components/Timeline/Timeline';
import { PublicationEntry } from '../components/PublicationEntry';
import { cvEntries } from '../data/cv';
import { publications } from '../data/publications';

const BEFORE_PUBLICATIONS = new Set(['education', 'work', 'research']);

export function CV() {
  const before = cvEntries.filter((entry) => BEFORE_PUBLICATIONS.has(entry.category));
  const after = cvEntries.filter((entry) => !BEFORE_PUBLICATIONS.has(entry.category));
  const sortedPublications = [...publications].sort((a, b) => b.year - a.year);

  return (
    <>
      <SEO
        title="CV"
        description="Full curriculum vitae: education, work experience, publications, awards, and service."
        path="/cv"
      />
      <article className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="mb-8 font-display text-4xl">Curriculum Vitae</h1>
        <div className="flex flex-col gap-10">
          <Timeline mode="grouped" items={before} />
          <section>
            <h2 className="mb-4 font-display text-2xl">Publications</h2>
            <ul className="flex flex-col gap-6">
              {sortedPublications.map((pub) => (
                <PublicationEntry key={pub.id} publication={pub} />
              ))}
            </ul>
          </section>
          <Timeline mode="grouped" items={after} />
        </div>
      </article>
    </>
  );
}
