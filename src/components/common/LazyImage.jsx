import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

export default function LazyImage({ src, alt, className = '', aspectRatio = 'aspect-video' }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const showFallback = error || !src;

  return (
    <div className={`relative overflow-hidden bg-[var(--color-surface-alt)] ${aspectRatio} ${className}`}>
      {showFallback ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]">
          <UtensilsCrossed className="w-6 h-6 opacity-60" />
          <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">SMARTAI Kitchen</span>
        </div>
      ) : (
        <>
          {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
          <img
            src={src}
            alt={alt || 'Food image'}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}
    </div>
  );
}