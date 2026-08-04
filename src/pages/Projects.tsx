import { SEO } from '../components/SEO';
import { Timeline } from '../components/Timeline/Timeline';
import { projects } from '../data/projects';

export function Projects() {
  return (
    <>
      <SEO title="Projects" description="A timeline of side projects and things I've built." path="/projects" />
      <article className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="mb-8 font-display text-4xl">Projects</h1>
        <Timeline mode="flat" items={projects} />
      </article>
    </>
  );
}
