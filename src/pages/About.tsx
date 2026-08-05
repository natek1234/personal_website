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
        <h1 className="mb-8 text-center font-display text-4xl">About</h1>
        <img
          src="/images/headshot.jpg"
          alt="Ketan Vasudeva"
          className="mx-auto mb-4 block h-40 w-40 shrink-0 rounded-lg object-cover shadow-md sm:float-left sm:mr-6"
        />
        <p className="mb-4">
          I'm an aerospace engineering PhD candidate at the University of Arizona's SpaceTREx Laboratory, working on
          lunar surface construction, regolith containment systems, and autonomous space robotics. I got here by way
          of the University of Toronto, where a BASc in Engineering Science (Robotics Major) had me building CubeSats
          with the University of Toronto Aerospace Team and prototyping hardware at hackathons and designathons, and
          an MASc where I designed a lunar robotic construction system for raw regolith and helped chair the Lunar
          BRICS consortium. That progression — from student projects to a thesis-driving research question — is what
          pulled me toward a PhD, and now shapes my work at the intersection of mechanical design, robotics, and
          mission concept development.
        </p>
        <p>
          Outside the lab, I build things end to end — writing production TypeScript and Python, standing up
          full-stack web apps on Cloudflare Pages and FastAPI, and experimenting with multi-agent LLM systems built
          with tools like Claude Code. I'm equally comfortable in a CAD tool, a CFD solver, or a React codebase. That
          same range carries into life outside of engineering: I played varsity ultimate frisbee at the University of
          Toronto, host The Sound of Space podcast, and have stayed involved in STEM education and policy advocacy
          work since undergrad. That mix — formal research training plus a builder's instinct for shipping working
          software — is what this site is meant to show: not just what I've studied, but what I've made.
        </p>
        <div className="clear-both" />
      </article>
    </>
  );
}
