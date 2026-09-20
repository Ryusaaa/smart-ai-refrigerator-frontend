import React, { useEffect, useState } from 'react';
import { ChefHat, Sparkles, AlertCircle } from 'lucide-react';

const PHRASES = [
  'Menyusun bahan dari kulkasmu...',
  'Menulis langkah memasak...',
  'Mencari foto hidangan...',
  'Menyimpan ke halaman Resep...',
];

const ROTATE_INTERVAL_MS = 2200;

export default function RecipeSuggestionLoading({ failed = false }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (failed) return undefined;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [failed]);

  if (failed) {
    return (
      <div
        role="status"
        className="mt-3.5 p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] flex items-center gap-2.5 text-xs text-[var(--color-text-muted)] animate-recipe-fade-in"
      >
        <AlertCircle className="w-4 h-4 flex-shrink-0 text-[var(--color-warning)]" />
        <span>Kartu resep belum bisa ditampilkan. Coba minta AI membuatkan resepnya lagi.</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="mt-3.5 p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] shadow-xs animate-recipe-fade-in"
    >
      <div className="flex items-center gap-3.5">
        <div className="recipe-skeleton w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center border border-[var(--color-border)]">
          <ChefHat className="w-7 h-7 text-[var(--color-primary)] animate-recipe-icon-bob" />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
            <Sparkles className="w-3 h-3 animate-recipe-twinkle" />
            Menyiapkan Resep
          </span>
          <div className="recipe-skeleton h-3.5 w-3/4 rounded-md" />
          <div className="recipe-skeleton h-2.5 w-1/2 rounded-md" />
        </div>
      </div>

      <p
        key={index}
        className="mt-3 text-[11px] font-medium text-[var(--color-text-muted)] animate-recipe-fade-in"
      >
        {PHRASES[index]}
      </p>
      <div className="recipe-loading-bar mt-2" />
    </div>
  );
}