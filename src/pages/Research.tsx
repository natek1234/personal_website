import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function Research() {
  return (
    <>
      <SEO
        title="Research"
        description="Lunar surface construction, regolith containment, and autonomous space robotics research."
        path="/research"
      />
      <article className="mx-auto max-w-2xl px-4 py-16 font-body leading-relaxed">
        <h1 className="mb-6 font-display text-4xl">Research</h1>
        <p className="mb-4">
          My PhD research at the University of Arizona, advised by <strong>Prof. Jekan Thanga</strong>, focuses on
          autonomous systems for lunar surface construction.
        </p>
        <h2 className="mb-2 mt-8 font-display text-2xl">Lunar Robotic Construction System (LRCS)</h2>
        <p className="mb-4">
          A system for autonomous regolith handling and structure assembly on the lunar surface, including regolith
          containment units (RCUs / LUNAR BRIC(S)) designed to hold and shape regolith into building elements.
        </p>
        <h2 className="mb-2 mt-8 font-display text-2xl">Pathfinder Mission Concept</h2>
        <p className="mb-4">
          Concept development for a pathfinder mission validating construction-relevant lunar surface operations
          ahead of larger-scale infrastructure deployment.
        </p>
        <p className="mt-8">
          <Link to="/research/publications" className="text-accent-text-light underline dark:text-accent-dark">
            Read the publications & writing →
          </Link>
        </p>
      </article>
    </>
  );
}
