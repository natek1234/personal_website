import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect } from 'vitest';
import { SEO } from './SEO';

describe('SEO', () => {
  it('sets document title and og:title meta tag', async () => {
    render(
      <HelmetProvider>
        <SEO title="Research" description="Research focus areas" path="/research" />
      </HelmetProvider>
    );

    await waitFor(() => expect(document.title).toBe('Research | Ketan Vasudeva'));
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe('Research | Ketan Vasudeva');
  });
});
