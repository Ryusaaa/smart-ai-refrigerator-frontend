// client/src/components/chat/StreamingCursor.jsx
// Gemini-style gradient-pulsing streaming cursor dot with GSAP per update_v3.md Section 4.2 & 4.4

import React, { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';

export default function StreamingCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      scale: 1.35,
      opacity: 0.35,
      duration: 0.55,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    return () => {
      tween.kill();
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <span
      ref={cursorRef}
      aria-hidden="true"
      className="inline-block w-2.5 h-2.5 rounded-full ml-1.5 align-middle shadow-xs bg-[image:var(--gradient-primary)]"
    />
  );
}
