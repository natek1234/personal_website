import type { CVEntry } from '../types/content';

export const cvEntries: CVEntry[] = [
  {
    id: 'phd-arizona',
    category: 'education',
    title: 'Ph.D., Aerospace Engineering',
    org: 'University of Arizona',
    dateRange: { start: '2021' },
    description: 'Advised by Prof. Jekan Thanga. Focus: lunar surface construction, regolith containment systems, autonomous space robotics.',
  },
  {
    id: 'lrcs-research',
    category: 'research',
    title: 'Lunar Robotic Construction System (LRCS)',
    org: 'University of Arizona',
    dateRange: { start: '2022' },
    description: 'Regolith containment units (RCUs / LUNAR BRIC(S)) for autonomous lunar surface construction.',
  },
  {
    id: 'pub-lunar-survey-cv',
    category: 'publications',
    title: 'A survey of lunar surface construction techniques',
    org: 'Progress in Aerospace Sciences',
    dateRange: { start: '2024' },
  },
  {
    id: 'pub-pathfinder-cv',
    category: 'publications',
    title: 'Pathfinder mission concept for lunar surface operations',
    org: 'Aerospace',
    dateRange: { start: '2024' },
  },
];
