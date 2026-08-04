import { describe, it, expect } from 'vitest';
import { groupByCategory } from './groupByCategory';
import type { CVEntry } from '../../types/content';

const entries: CVEntry[] = [
  { id: 'a', category: 'research', title: 'A', dateRange: { start: '2022' } },
  { id: 'b', category: 'education', title: 'B', dateRange: { start: '2021' } },
  { id: 'c', category: 'research', title: 'C', dateRange: { start: '2024' } },
];

describe('groupByCategory', () => {
  it('groups entries by category, newest first within each group', () => {
    const grouped = groupByCategory(entries);
    expect(grouped.research.map((e) => e.id)).toEqual(['c', 'a']);
    expect(grouped.education.map((e) => e.id)).toEqual(['b']);
    expect(grouped.publications).toEqual([]);
  });
});
