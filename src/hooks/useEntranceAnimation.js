// client/src/hooks/useEntranceAnimation.js
// Generic GSAP fade + slide-up entrance animation hook per update_v3.md Section 3.4

import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export function useEntranceAnimation(options = {}) {
  const containerRef = useRef(null);
  const {
    y = 14,
    x = 0,
    opacity = 0,
    duration = 0.35,
    ease = 'power2.out',
    delay = 0,
    scale = 1
  } = options;

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.from(containerRef.current, {
      y,
      x,
      opacity,
      scale,
      duration,
      delay,
      ease,
    });
  }, { scope: containerRef });

  return containerRef;
}
