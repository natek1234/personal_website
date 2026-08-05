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
          I am an Aerospace Engineering PhD student at the University of Arizona's SpaceTREx Laboratory, presently
          working on bridging the robustness gap between terrestrial multi-modal AI systems, and space robotic
          systems. My academic adventure began far before the university scene, reading space books in the school
          library and taking an interest in all things science. This drew me to the Engineering Science program at
          the University of Toronto, where I graduated in the Robotics Major with honours. Already at this stage I
          had taken the leap into space, working with the University of Toronto Aerospace Team (UTAT) to build
          satellites and working for GHGSat, a greenhouse gas satellite company. It is in this program that I was
          able to combine my interests in robotics, AI, space, and bio-inspired systems to explore a thesis on
          Markov Brains for autonomous swarm robotics in space exploration, developing my own evolutionary algorithm
          software. From here, I continued on to complete my MASc at the University of Toronto Institute for
          Aerospace Studies (UTIAS), working in the Aerospace Mechatronics Laboratory on a Lunar Robotic Construction
          System (LRCS). This thesis was also supervised and funded by MDA Space and it led to my involvement in the
          Lunar BRICS consortium. The purpose of the LRCS is to bag and manipulate Regolith Containment Units (RCUs),
          analogous to lunar sandbags, in order to protect lunar surface structures and equipment from environmental
          hazards, such as radiation, thermal fluctuations, and ballistic impacts (e.g., micrometeoroids). It is by
          continuing this work and pursuing a new research direction that I have now come to the University of
          Arizona.
        </p>
        <p>
          However, my life is not all research and engineering. I am a staunch believer that we must push ethical
          uses of technology, and human-centered development. There must be purpose behind our work, and this
          purpose should benefit people and society as a whole. I am a strong advocate for the importance of STEM
          communication, having founded, led, and hosted my own space podcast (TSOS) for a number of years. I have
          advocated for inclusive policy with Engineers Without Borders (EWB), believing that we are better together.
          Whether through education, policy, or technology, I hope to continue working towards a better world for
          all.
        </p>
        <div className="clear-both" />
      </article>
    </>
  );
}
