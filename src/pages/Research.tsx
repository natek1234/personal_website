import { SEO } from '../components/SEO';
import { PublicationEntry } from '../components/PublicationEntry';
import { publications } from '../data/publications';

export function Research() {
  const sorted = [...publications].sort((a, b) => b.year - a.year);

  return (
    <>
      <SEO
        title="Research"
        description="Lunar surface construction, regolith containment, and multi-modal AI for autonomous space service robots — research across the University of Toronto and University of Arizona."
        path="/research"
      />
      <article className="mx-auto max-w-2xl px-4 py-16 font-body leading-relaxed">
        <h1 className="mb-6 font-display text-4xl">Research</h1>
        <p className="mb-4">
          My research began at the <strong>University of Toronto</strong>, where I studied Engineering Science with a
          Robotics Major and worked with the University of Toronto Aerospace Team on payload electronics and
          firmware for a greenhouse-gas-monitoring imaging satellite, alongside undergraduate thesis work on Markov
          Brain techniques for robotic swarm control. I continued at the University of Toronto's{' '}
          <strong>Aerospace Mechatronics Laboratory</strong> for my M.A.Sc. in Aerospace Engineering, where I chaired
          the Lunar BRICS consortium and led development of the{' '}
          <strong>Lunar Robotic Construction System (LRCS)</strong> — including regolith containment units (RCUs)
          for autonomous lunar surface construction. I am now a Ph.D. candidate at the{' '}
          <strong>University of Arizona</strong>'s <strong>SpaceTREx Laboratory</strong>, where my research focuses
          on increasing the robustness of multi-modal AI for space robots, bridging terrestrial capabilities with
          space implementation.
        </p>

        <h2 className="mb-4 mt-10 font-display text-2xl">Publications &amp; Writing</h2>
        <ul className="flex flex-col gap-6">
          {sorted.map((pub) => (
            <PublicationEntry key={pub.id} publication={pub} />
          ))}
        </ul>
      </article>
    </>
  );
}
