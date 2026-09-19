import React, { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { gsap } from '../../lib/gsap';

const LOADING_PHRASES = [
  'Mencari kombinasi resep…',
  'Menganalisis bahan di kulkas…',
  'Meracik saran terbaik…',
  'Menghitung nutrisi…',
  'Menyiapkan jawaban…',
  'AI sedang berpikir…',
  'Mengeksplorasi ide masakan…',
];

export default function TypingIndicator({ label }) {
  const shimmerTextRef = useRef(null);
  const containerRef = useRef(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayLabel, setDisplayLabel] = useState(label || LOADING_PHRASES[0]);

  // Rotate through fun loading phrases every 2.2s when no explicit label
  useEffect(() => {
    if (label) {
      setDisplayLabel(label);
      return;
    }
    const interval = setInterval(() => {
      setPhraseIndex(prev => {
        const next = (prev + 1) % LOADING_PHRASES.length;
        setDisplayLabel(LOADING_PHRASES[next]);
        // Animate text swap
        if (shimmerTextRef.current) {
          gsap.fromTo(
            shimmerTextRef.current,
            { opacity: 0, y: 4 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        }
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [label]);

  // Shimmer animation on text
  useEffect(() => {
    const el = shimmerTextRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { backgroundPosition: '-200% 0' },
      { backgroundPosition: '200% 0', duration: 2.2, repeat: -1, ease: 'linear' }
    );
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.28,
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
        {/* AI avatar with pulsing glow */}
        <div
          className="w-8 h-8 rounded-xl text-white flex items-center justify-center flex-shrink-0 shadow-md mt-0.5 relative"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '5s' }} />
          {/* Glow ring */}
          <span
            className="absolute inset-0 rounded-xl opacity-40 animate-ping"
            style={{ background: 'var(--gradient-primary)' }}
          />
        </div>

        {/* Bubble */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          <div className="flex items-center space-x-2.5">
            {/* Rotating text */}
            <span
              ref={shimmerTextRef}
              className="text-sm font-semibold tracking-wide"
              style={{
                backgroundImage: 'var(--gradient-text)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {displayLabel}
            </span>
            {/* Bouncing dots */}
            <div className="flex space-x-1 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary)] animate-bounce" style={{ animationDelay: '160ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce" style={{ animationDelay: '320ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
