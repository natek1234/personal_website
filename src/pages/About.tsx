import { SEO } from '../components/SEO';

export function About() {
  return (
    <>
      <SEO
        title="About"
        description="About Ketan Vasudeva — aerospace engineering PhD candidate and builder."
        path="/about"
      />
      <article className="mx-auto max-w-2xl px-4 py-16 font-body leading-relaxed">
        <h1 className="mb-6 font-display text-4xl">About</h1>
        <p className="mb-4">
          I'm an aerospace engineering PhD candidate at the University of Arizona, working under Prof. Jekan Thanga
          on lunar surface construction, regolith containment systems, and autonomous space robotics. My research
          sits at the intersection of mechanical design, robotics, and mission concept development.
        </p>
        <p className="mb-4">
          Outside the lab, I build things end to end — writing production TypeScript and Python, standing up
          full-stack web apps on Cloudflare Pages and FastAPI, and experimenting with multi-agent LLM systems built
          with tools like Claude Code. I'm equally comfortable in a CAD tool, a CFD solver, or a React codebase.
        </p>
        <p>
          That mix — formal research training plus a builder's instinct for shipping working software — is what
          this site is meant to show: not just what I've studied, but what I've made.
        </p>
      </article>
    </>
  );
}
