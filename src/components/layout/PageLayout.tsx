import { useOutlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function PageLayout() {
  const location = useLocation();
  // `useOutlet()` resolves the child route element at *render* time and returns it as a
  // plain element. `<Outlet/>` would instead re-read the routing context on every render,
  // so the exiting subtree AnimatePresence keeps mounted during the fade-out would render
  // the NEW route's content — making navigation flash the new page, fade it out, then fade
  // it back in. Snapshotting the element keeps the OLD page on screen while it exits.
  const outlet = useOutlet();

  return (
    <div className="flex min-h-screen flex-col font-body">
      <Nav />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
