import { createBrowserRouter } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Research } from './pages/Research';
import { Publications } from './pages/Publications';
import { Projects } from './pages/Projects';
import { Resume } from './pages/Resume';
import { CV } from './pages/CV';
import { Contact } from './pages/Contact';

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/research', element: <Research /> },
      { path: '/research/publications', element: <Publications /> },
      { path: '/projects', element: <Projects /> },
      { path: '/resume', element: <Resume /> },
      { path: '/cv', element: <CV /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
]);
