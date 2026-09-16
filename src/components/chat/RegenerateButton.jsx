import React, { useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { gsap } from '../../lib/gsap';

export default function RegenerateButton({ onRegenerate }) {
  const btnRef = useRef(null);

  const handlePointerDown = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    }
  };

  return (
    <button
      ref={btnRef}
      onPointerDown={handlePointerDown}
      onClick={onRegenerate}
      type="button"
      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xs hover:bg-[var(--color-surface-alt)] transition-colors cursor-pointer"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      <span>Regenerate response</span>
    </button>
  );
}
