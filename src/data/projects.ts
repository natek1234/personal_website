import type { Project } from '../types/content';

export const projects: Project[] = [
  {
    id: 'sda-balloon',
    title: 'High-Altitude Balloon SDA Platform (Whitepaper)',
    dateRange: { start: '2026', end: '2026' },
    summary: 'Optical LEO-observation payload flown on a high-altitude balloon for Space Domain Awareness.',
    tags: ['Space Domain Awareness', 'Optics', 'High-Altitude Balloon'],
  },
  {
    id: 'precision-ag-balloon',
    title: 'Dual-Tier Precision Agriculture Balloon Platform (Whitepaper)',
    dateRange: { start: '2026', end: '2026' },
    summary: 'A two-tier balloon platform for precision agriculture sensing.',
    tags: ['Precision Agriculture', 'High-Altitude Balloon', 'Remote Sensing'],
  },
  {
    id: 'lit-agent',
    title: 'Autonomous Academic Literature-Sourcing Agent',
    dateRange: { start: '2026', end: '2026' },
    summary: 'A multi-agent architecture, built with Claude Code, that autonomously sources and synthesizes academic literature.',
    tags: ['Multi-Agent Systems', 'LLM Tooling', 'Claude Code'],
    links: [{ label: 'GitHub', url: 'https://github.com/natek1234/literature_scraping_agent' }],
  },
  {
    id: 'utdl-robodog',
    title: 'UTDL Robodog — Software Team Lead',
    dateRange: { start: '2022', end: '2022' },
    summary:
      'Led a software development team of 10 building an autonomous robotic dog and manipulator using ROS, tackling computer vision, path planning, and control systems.',
    role: 'Software Team Lead',
    tags: ['ROS', 'Robotics', 'Computer Vision', 'Path Planning'],
  },
  {
    id: 'utat-aerospace-team',
    title: 'University of Toronto Aerospace Team (UTAT)',
    dateRange: { start: '2019', end: '2023' },
    summary:
      'Worked in Space Systems across the payload electronics, electrical, systems, and firmware teams to design and build an imaging satellite for measuring anthropogenic greenhouse gas emissions.',
    tags: ['CubeSat', 'Payload Electronics', 'Firmware', 'Systems Engineering'],
  },
  {
    id: 'nasa-spaceapps-hackathon',
    title: 'NASA SpaceApps 2020 Hackathon — Toronto & Canada CSA Winner',
    dateRange: { start: '2020', end: '2020' },
    summary:
      'Built an educational sandbox tool simulating the challenges of communicating with people on Mars, using NASA/CSA data sets, React.js, Node.js/Express.js, and Python.',
    tags: ['React', 'Node.js', 'Python', 'Hackathon'],
  },
  {
    id: 'sound-of-space-podcast',
    title: 'The Sound of Space',
    dateRange: { start: '2021', end: '2025' },
    summary: 'Founded a podcast exploring the wonders, dangers, and practical applications of space.',
    role: 'Host and Lead',
    tags: ['Podcast', 'Science Communication'],
    bullets: ['Produced educational space videos for release on the podcast\'s Instagram page'],
    links: [
      { label: 'Spotify', url: 'https://open.spotify.com/show/6RQjnfSOOfoKXDSyLCLtYg?si=621c3b4e686c4cdd' },
      {
        label: 'Instagram',
        url: 'https://www.instagram.com/_thesoundofspace?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      },
    ],
  },
  {
    id: 'ewb-policy-advocacy',
    title: 'Engineers Without Borders Canada — Policy and Advocacy Team',
    dateRange: { start: '2018', end: '2019' },
    summary:
      "Advocated for EWB Canada's 2030 Sustainable Development Goals platform, including meetings with Members of Parliament to build support for the platform.",
    role: 'Policy and Advocacy Team Member',
    tags: ['Policy', 'Advocacy', 'Nonprofit'],
  },
  {
    id: 'utdl-designathon',
    title: 'UTDL Designathon',
    dateRange: { start: '2019', end: '2019' },
    summary:
      'Designed, prototyped, built, and tested a pin-locked, fully-integrated safety box to prevent home delivery package theft, using Arduino, CAD, and motors.',
    tags: ['Arduino', 'CAD', 'Hardware Design'],
  },
];
