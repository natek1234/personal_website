import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

describe('generated placeholder resume', () => {
  it('exists and starts with the PDF magic bytes', () => {
    expect(existsSync('public/resume-placeholder.pdf')).toBe(true);
    const bytes = readFileSync('public/resume-placeholder.pdf');
    expect(bytes.subarray(0, 4).toString()).toBe('%PDF');
  });
});
