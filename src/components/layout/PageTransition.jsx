// client/src/components/layout/PageTransition.jsx
// Fades/slides each route's content in on navigation, keyed by pathname so
// it re-triggers on every page change. Works together with
// RouteProgressBar.jsx for the full "page transition loading" feel.

import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP, gsap } from '../../lib/gsap';

export default function PageTransition({ children }) {
  const location = useLocation();
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  }, { scope: containerRef, dependencies: [location.pathname] });

  return (
    <div key={location.pathname} ref={containerRef}>
      {children}
    </div>
  );
}
