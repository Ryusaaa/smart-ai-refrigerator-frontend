// client/src/hooks/useStaggerList.js
// Stagger entrance animation wrapper for lists using GSAP per update_v3.md Section 3.2 & 3.4

import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

export function useStaggerList(childSelector = ':scope > *', deps = [], options = {}) {
  const containerRef = useRef(null);
  const {
    stagger = 0.05,
    y = 16,
    opacity = 0,
    duration = 0.35,
    ease = 'power2.out',
  } = options;

  useGSAP(() => {
    if (!containerRef.current) return;
    let elements = [];
    try {
      if (!childSelector || childSelector === ':scope > *' || childSelector === '> *') {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = containerRef.current.querySelectorAll(childSelector);
      }
    } catch (e) {
      elements = Array.from(containerRef.current.children);
    }

    if (!elements || elements.length === 0) return;

    gsap.from(elements, {
      y,
      opacity,
      duration,
      stagger,
      ease,
    });
  }, { scope: containerRef, dependencies: deps });

  return containerRef;
}
