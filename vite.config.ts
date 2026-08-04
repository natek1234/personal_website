/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // react-snap's bundled Puppeteer ships an old Chromium (~2019) that can't
    // parse ES2020+ syntax (optional chaining, nullish coalescing). Vite's
    // default build target emits that syntax, which crashes the prerender
    // crawl with "Unexpected token '?'". Target es2017 so esbuild downlevels
    // it for the prerender step; browsers you actually ship to are unaffected
    // since Vite still handles feature detection/polyfills as needed.
    target: 'es2017',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
