import React, { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { gsap } from '../../lib/gsap';

export default function StatusIndicator({ status }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!status) return;
    const el = textRef.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { backgroundPosition: '-200% 0' },
      { backgroundPosition: '200% 0', duration: 1.8, repeat: -1, ease: 'linear' }
    );

    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 6,
        duration: 0.2,
        ease: 'power2.out',
      });
    }

    return () => {
      tween.kill();
      gsap.killTweensOf(el);
    };
  }, [status]);

  if (!status) return null;

  return (
    <div
      ref={containerRef}
      className="flex items-center space-x-2 text-xs font-semibold mb-4 px-3.5 py-1.5 bg-[var(--color-surface)] rounded-xl w-fit border border-[var(--color-border)] shadow-2xs"
    >
      <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--color-primary)]" />
      <span
        ref={textRef}
        className="font-medium tracking-wide"
        style={{
          backgroundImage: 'var(--gradient-text)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {status}
      </span>
    </div>
  );
}
