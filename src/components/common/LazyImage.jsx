import React, { useState } from 'react';
import placeholderFood from '../../assets/placeholder-food.svg';

export default function LazyImage({ src, alt, className = '', aspectRatio = 'aspect-video' }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageSrc = error || !src ? placeholderFood : src;

  return (
    <div className={`relative overflow-hidden bg-[var(--color-surface-alt)] ${aspectRatio} ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 skeleton-shimmer" />
      )}
      <img
        src={imageSrc}
        alt={alt || 'Food image'}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
