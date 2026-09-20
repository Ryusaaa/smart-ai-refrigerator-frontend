// client/src/components/layout/RouteProgressBar.jsx
// Top-of-page loading bar shown on every route change, per the request for
// a page-transition loading animation ("animasi loading saat pindah halaman").
// This is route-transition feedback (fires the instant navigation starts),
// separate from each page's own data-loading skeleton.

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../../lib/gsap';

export default function RouteProgressBar() {
  const location = useLocation();
  const barRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const el = barRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.set(el, { scaleX: 0, opacity: 1, transformOrigin: 'left center' });
    const tl = gsap.timeline();
    tl.to(el, { scaleX: 0.35, duration: 0.15, ease: 'power1.out' })
      .to(el, { scaleX: 0.75, duration: 0.25, ease: 'power1.out' })
      .to(el, { scaleX: 1, duration: 0.15, ease: 'power1.out' })
      .to(el, { opacity: 0, duration: 0.25, delay: 0.05 });
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-[image:var(--gradient-primary)] opacity-0"
        style={{ boxShadow: '0 0 8px var(--color-primary)' }}
      />
    </div>
  );
}
