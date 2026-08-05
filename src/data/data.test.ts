import { describe, it, expect } from 'vitest';
import { projects } from './projects';
import { publications } from './publications';
import { cvEntries } from './cv';
import { contactLinks } from './contact';

function idsAreUnique(items: { id: string }[]) {
  const ids = items.map((i) => i.id);
  return new Set(ids).size === ids.length;
}

describe('content data integrity', () => {
  it('has at least one seed project with unique ids', () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(idsAreUnique(projects)).toBe(true);
  });

  it('has unique publication ids and valid types', () => {
    expect(idsAreUnique(publications)).toBe(true);
    for (const pub of publications) {
      expect(['journal', 'conference', 'whitepaper', 'thesis']).toContain(pub.type);
    }
  });

  it('has unique cv entry ids and only known categories', () => {
    expect(idsAreUnique(cvEntries)).toBe(true);
    const known = ['education', 'work', 'research', 'publications', 'talks', 'awards', 'grants', 'service'];
    for (const entry of cvEntries) {
      expect(known).toContain(entry.category);
    }
  });

  it('has exactly 6 contact links (2 emails + github + linkedin + scholar + orcid)', () => {
    expect(contactLinks).toHaveLength(6);
    expect(idsAreUnique(contactLinks)).toBe(true);
  });
});
