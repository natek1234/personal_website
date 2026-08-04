import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline } from './Timeline';
import type { Project } from '../../types/content';

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
});
