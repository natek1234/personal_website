import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { ThemeProvider } from './theme/ThemeContext';
import { routes } from './router';

const { query, dataRoutes } = createStaticHandler(routes);

export type RenderResult = { html: string; headTags: string };

// Renders one route to a static HTML string, for scripts/prerender.mjs to run per-route
// at build time. No loaders/actions exist in this app's routes, so `query` always resolves
// to a context synchronously derivable from the URL — never a redirect Response.
export async function render(url: string): Promise<RenderResult> {
  const context = await query(new Request(`http://localhost${url}`));

  if (context instanceof Response) {
    throw new Error(`Unexpected redirect while prerendering ${url} (status ${context.status})`);
  }

  const router = createStaticRouter(dataRoutes, context);
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <ThemeProvider>
          <StaticRouterProvider router={router} context={context} hydrate={false} />
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;
  const headTags = helmet
    ? [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString()].filter(Boolean).join('\n    ')
    : '';

  return { html, headTags };
}
