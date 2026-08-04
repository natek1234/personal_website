import { SEO } from '../components/SEO';
import { Timeline } from '../components/Timeline/Timeline';
import { cvEntries } from '../data/cv';

export function CV() {
  return (
    <>
      <SEO
        title="CV"
        description="Full curriculum vitae: education, research, publications, talks, grants, and service."
        path="/cv"
      />
      <article className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="mb-8 font-display text-4xl">Curriculum Vitae</h1>
        <Timeline mode="grouped" items={cvEntries} />
      </article>
    </>
  );
}
