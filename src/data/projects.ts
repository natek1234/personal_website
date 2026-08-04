import type { Project } from '../types/content';

export const projects: Project[] = [
  {
    id: 'vapor',
    title: 'VAPOR — Venus Aerobot CubeSat Mission Concept',
    dateRange: { start: '2023' },
    summary: 'Mission concept and ConOps/trade study work for a Venus atmospheric aerobot delivered via CubeSat.',
    tags: ['CubeSat', 'ConOps', 'Venus', 'Mission Design'],
    featured: true,
  },
  {
    id: 'sda-balloon',
    title: 'High-Altitude Balloon SDA Platform',
    dateRange: { start: '2022' },
    summary: 'Optical LEO-observation payload flown on a high-altitude balloon for Space Domain Awareness.',
    tags: ['Space Domain Awareness', 'Optics', 'High-Altitude Balloon'],
  },
  {
    id: 'precision-ag-balloon',
    title: 'Dual-Tier Precision Agriculture Balloon Platform',
    dateRange: { start: '2021' },
    summary: 'A two-tier balloon platform for precision agriculture sensing.',
    tags: ['Precision Agriculture', 'High-Altitude Balloon', 'Remote Sensing'],
  },
  {
    id: 'lit-agent',
    title: 'Autonomous Academic Literature-Sourcing Agent',
    dateRange: { start: '2025' },
    summary: 'A multi-agent architecture, built with Claude Code, that autonomously sources and synthesizes academic literature.',
    tags: ['Multi-Agent Systems', 'LLM Tooling', 'Claude Code'],
  },
];
