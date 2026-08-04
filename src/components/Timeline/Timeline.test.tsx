import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline } from './Timeline';
import type { CVEntry, Project } from '../../types/content';

const projects: Project[] = [
  { id: 'p1', title: 'Older', dateRange: { start: '2021' }, summary: 's1', tags: [] },
  { id: 'p2', title: 'Newer', dateRange: { start: '2023' }, summary: 's2', tags: [] },
];

describe('Timeline (flat mode)', () => {
  it('renders every item, newest first', () => {
    render(<Timeline mode="flat" items={projects} />);
    const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual(['Newer', 'Older']);
  });

  it('renders a project role when present', () => {
    const withRole: Project[] = [
      { id: 'p3', title: 'Led Project', dateRange: { start: '2022' }, summary: 's3', tags: [], role: 'Team Lead' },
    ];
    render(<Timeline mode="flat" items={withRole} />);
    expect(screen.getByText('Team Lead')).toBeInTheDocument();
  });

  it('renders project links when present', () => {
    const withLinks: Project[] = [
      {
        id: 'p4',
        title: 'Open Source Project',
        dateRange: { start: '2024' },
        summary: 's4',
        tags: [],
        links: [{ label: 'GitHub', url: 'https://github.com/example/repo' }],
      },
    ];
    render(<Timeline mode="flat" items={withLinks} />);
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com/example/repo');
    expect(link.querySelector('svg')).toBeInTheDocument();
  });

  it('renders bullets on a project when present', () => {
    const withBullets: Project[] = [
      {
        id: 'p5',
        title: 'Podcast',
        dateRange: { start: '2021' },
        summary: 's5',
        tags: [],
        bullets: ['Produced educational videos'],
      },
    ];
    render(<Timeline mode="flat" items={withBullets} />);
    expect(screen.getByText('Produced educational videos')).toBeInTheDocument();
  });
});

const cvEntries: CVEntry[] = [
  {
    id: 'e1',
    category: 'education',
    title: 'PhD in Robotics',
    org: 'MIT',
    dateRange: { start: '2018', end: '2022' },
    description: 'Doctoral research in soft robotics.',
  },
  {
    id: 'r1',
    category: 'research',
    title: 'Older Research Role',
    dateRange: { start: '2020' },
  },
  {
    id: 'r2',
    category: 'research',
    title: 'Newer Research Role',
    org: 'Robotics Lab',
    dateRange: { start: '2023' },
    description: 'Led a team building autonomous manipulators.',
  },
];

describe('Timeline (grouped mode)', () => {
  it('renders a heading for each category present, in category order', () => {
    render(<Timeline mode="grouped" items={cvEntries} />);
    const categoryHeadings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(categoryHeadings).toEqual(['Education', 'Research']);
  });

  it('omits headings for categories with no entries', () => {
    render(<Timeline mode="grouped" items={cvEntries} />);
    expect(screen.queryByRole('heading', { level: 2, name: 'Publications' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'Talks' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'Grants & Proposals' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'Service' })).not.toBeInTheDocument();
  });

  it('orders entries within a category newest first', () => {
    render(<Timeline mode="grouped" items={cvEntries} />);
    const entryHeadings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(entryHeadings).toEqual(['PhD in Robotics', 'Newer Research Role', 'Older Research Role']);
  });

  it('passes org and description through to the rendered entry', () => {
    render(<Timeline mode="grouped" items={cvEntries} />);
    expect(screen.getByText('Robotics Lab')).toBeInTheDocument();
    expect(screen.getByText('Led a team building autonomous manipulators.')).toBeInTheDocument();
  });

  it('renders bullets as separate list items, with plain-text and hyperlinked bullets both supported', () => {
    const withBullets: CVEntry[] = [
      {
        id: 'e2',
        category: 'education',
        title: 'BSc in Engineering',
        dateRange: { start: '2015', end: '2019' },
        bullets: ['Dean\'s List', { text: 'Member of the Robotics Lab', url: 'https://example.com/lab' }],
      },
    ];
    render(<Timeline mode="grouped" items={withBullets} />);
    expect(screen.getByText("Dean's List").tagName).toBe('LI');
    const labLink = screen.getByRole('link', { name: 'Member of the Robotics Lab' });
    expect(labLink).toHaveAttribute('href', 'https://example.com/lab');
    expect(labLink.closest('li')).toBeInTheDocument();
  });
});
