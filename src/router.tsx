import type { RouteObject } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Research } from './pages/Research';
import { Projects } from './pages/Projects';
import { Resume } from './pages/Resume';
import { CV } from './pages/CV';
import { Contact } from './pages/Contact';

// Kept as a plain route config (not wrapped in createBrowserRouter here) so this module
// has no browser-only side effects — entry-server.tsx imports `routes` to build a matching
// static router during SSR, and createBrowserRouter touches `document` at call time, which
// doesn't exist in Node.
export const routes: RouteObject[] = [
  {
    element: <PageLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/research', element: <Research /> },
      { path: '/projects', element: <Projects /> },
      { path: '/resume', element: <Resume /> },
      { path: '/cv', element: <CV /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
];
