import React, { useRef } from 'react';
import { Square } from 'lucide-react';
import { gsap } from '../../lib/gsap';

export default function StopButton({ onStop }) {
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
      onClick={onStop}
      type="button"
      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-surface)] text-[var(--color-danger)] border border-[var(--color-danger)]/40 shadow-xs hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
    >
      <Square className="w-3 h-3 fill-current" />
      <span>Stop generating</span>
    </button>
  );
}
