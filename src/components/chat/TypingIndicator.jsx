import React, { useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { gsap } from '../../lib/gsap';

export default function TypingIndicator({ label = 'Thinking...' }) {
  const shimmerTextRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = shimmerTextRef.current;
    if (!el) return;

    // Looping gradient shimmer horizontally across text
    const tween = gsap.fromTo(
      el,
      { backgroundPosition: '-200% 0' },
      { backgroundPosition: '200% 0', duration: 2, repeat: -1, ease: 'linear' }
    );

    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.25,
        ease: 'power2.out',
      });
    }

    return () => {
      tween.kill();
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex justify-start mb-4">
      <div className="flex items-start space-x-2.5 max-w-[85%] sm:max-w-[75%]">
        <div className="w-8 h-8 rounded-xl bg-[var(--gradient-primary)] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs">
          <div className="flex items-center space-x-2">
            <span
              ref={shimmerTextRef}
              className="text-sm font-semibold tracking-wide bg-[var(--gradient-text)] bg-clip-text text-transparent"
              style={{ backgroundSize: '200% 100%' }}
            >
              {label}
            </span>
            <div className="flex space-x-1 items-center opacity-70">
              <div className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-[var(--color-secondary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
