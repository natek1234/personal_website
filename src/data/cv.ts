import type { CVEntry } from '../types/content';

export const cvEntries: CVEntry[] = [
  // Education
  {
    id: 'phd-arizona',
    category: 'education',
    title: 'Ph.D., Aerospace Engineering',
    org: 'University of Arizona',
    dateRange: { start: '2026' },
    bullets: [
      { text: 'Member of the SpaceTREx Laboratory', url: 'https://spacetrex.arizona.edu/' },
      'Thesis: Multi-modal AI for Autonomous Space Service Robots',
    ],
  },
  {
    id: 'masc-toronto',
    category: 'education',
    title: 'M.A.Sc., Aerospace Engineering',
    org: 'University of Toronto',
    dateRange: { start: '2023', end: '2025' },
    bullets: [
      { text: 'Participated in and chaired the Lunar BRICS consortium', url: 'https://lunar-bric.arizona.edu/' },
      { text: 'Member of the Aerospace Mechatronics Laboratory', url: 'https://mechatronics.aerospace.utoronto.ca/' },
      'Thesis: A Lunar Robotic Construction System for Raw Regolith',
    ],
  },
  {
    id: 'basc-toronto',
    category: 'education',
    title: 'B.A.Sc., Engineering Science (Honours) — Robotics Major',
    org: 'University of Toronto',
    dateRange: { start: '2018', end: '2023' },
    bullets: [
      'Minor in Business',
      "Dean's List",
      'Thesis: Markov Brain Techniques for Robotic Swarm Control in Space Exploration',
    ],
  },

  // Work experience
  {
    id: 'mda-space',
    category: 'work',
    title: 'Systems Engineer',
    org: 'MDA Space',
    dateRange: { start: '2023', end: '2025' },
    description:
      'R&D with MDA Space and the University of Toronto designing robotic technologies for lunar construction. Conceptualized and performed system-level design for a robotic system to fill and manipulate lunar regolith containment units, including in-lab testing with regolith simulant and electromechanical design and analysis.',
  },
  {
    id: 'praxis-ta',
    category: 'work',
    title: 'Praxis 3 Teaching Assistant',
    org: 'University of Toronto',
    dateRange: { start: '2023', end: '2025' },
    description: 'Assessment and Studio TA delivering laboratory sessions in software, electronic, mechanical, and system-level design.',
  },
  {
    id: 'ghgsat',
    category: 'work',
    title: 'Science Software Engineer',
    org: 'GHGSat',
    dateRange: { start: '2021', end: '2022' },
    description:
      'R&D delivering industry-level greenhouse gas density maps by processing raw satellite data. Independently developed and maintained a command-line tool for visualizing satellite retrieval data.',
  },
  {
    id: 'manulife-coop',
    category: 'work',
    title: 'Full-Stack Software Engineer Co-op',
    org: 'Manulife — Canadian Architecture',
    dateRange: { start: '2020', end: '2020' },
    description:
      'Developed and deployed a web tool, using Agile methodology, to automate security threat analysis reports for Security Architecture, increasing productivity by 30% by decreasing average report creation time.',
  },
  {
    id: 'praxis-ra',
    category: 'work',
    title: 'Praxis 3 Research Assistant',
    org: 'University of Toronto',
    dateRange: { start: '2020', end: '2021' },
    description:
      'Worked with faculty to build an Engineering Science design course focused on global community collaboration; created the literature review used as a foundation for course partnerships and materials.',
  },
  {
    id: 'tangerine-coop',
    category: 'work',
    title: 'Project Management Office (PMO) Associate Co-op',
    org: 'Tangerine',
    dateRange: { start: '2019', end: '2019' },
    description:
      "Supported development project management and reporting across the company's Agile transformation, acting as a communication link between the PMO and engineering squads.",
  },

  // Awards & achievements — exact years unconfirmed for the pre-2020 ones, placed under
  // undergrad years (2018) as a sort-order placeholder until real dates are supplied.
  {
    id: 'award-spaceapps-hackathon',
    category: 'awards',
    title: 'NASA SpaceApps Hackathon Winner',
    org: 'Toronto & Canada CSA',
    dateRange: { start: '2020', end: '2020' },
  },
  {
    id: 'award-paula-burke',
    category: 'awards',
    title: 'Paula Burke Bursary',
    org: 'University of Toronto',
    dateRange: { start: '2018', end: '2018' },
  },
  {
    id: 'award-uoft-scholar',
    category: 'awards',
    title: 'University of Toronto Scholar',
    org: 'University of Toronto',
    dateRange: { start: '2018', end: '2018' },
  },
  {
    id: 'award-aia-scholarship',
    category: 'awards',
    title: 'AIA Canada Scholarship',
    org: 'AIA Canada',
    dateRange: { start: '2018', end: '2018' },
  },
  {
    id: 'award-ultimate-rookie',
    category: 'awards',
    title: 'Varsity Ultimate Team — Rookie of the Year',
    org: 'University of Toronto',
    dateRange: { start: '2018', end: '2018' },
  },
];
