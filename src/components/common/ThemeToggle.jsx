import React, { useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { gsap, useGSAP } from '../../lib/gsap';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const iconRef = useRef(null);
  const btnRef = useRef(null);

  useGSAP(() => {
    if (!iconRef.current) return;
    gsap.fromTo(
      iconRef.current,
      { rotate: isDark ? -90 : 90, scale: 0.7, opacity: 0 },
      { rotate: 0, scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.7)' }
    );
  }, { dependencies: [isDark] });

  const handlePointerDown = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
    }
  };

  return (
    <button
      ref={btnRef}
      onPointerDown={handlePointerDown}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2.5 rounded-full transition-colors bg-[var(--color-surface-alt)] text-[var(--color-text)] hover:opacity-80 border border-[var(--color-border)] shadow-sm flex items-center justify-center cursor-pointer"
    >
      <div ref={iconRef}>
        {isDark ? (
          <Moon className="w-5 h-5 text-indigo-300" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" />
        )}
      </div>
    </button>
  );
}
