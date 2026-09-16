import React, { useRef } from 'react';
import { Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../../lib/gsap';
import LazyImage from '../common/LazyImage';

export default function RecipeCard({ recipe, onClick }) {
  const difficultyColors = {
    easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-900',
    hard: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
  };

  const id = recipe.id || recipe._id;
  const cardRef = useRef(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 18,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, { scope: cardRef });

  const handlePointerDown = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: -4, duration: 0.2, ease: 'power1.out' });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: 0, duration: 0.2, ease: 'power1.out' });
    }
  };

  const cardBody = (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden hover:shadow-elevated transition-shadow h-full flex flex-col justify-between cursor-pointer group"
      onClick={onClick ? () => onClick(recipe) : undefined}
    >
      <div>
        <LazyImage src={recipe.imageUrl} alt={recipe.title} aspectRatio="aspect-video" className="w-full" />
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold font-serif text-xl text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
              {recipe.title}
            </h3>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>
      </div>
      
      <div className="px-5 pb-5 flex flex-wrap gap-2 items-center text-xs pt-3 border-t border-[var(--color-border)]/60">
        <div className="flex items-center text-[var(--color-text-muted)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-lg font-medium">
          <Clock className="w-3.5 h-3.5 mr-1 text-[var(--color-primary)]" />
          <span>{recipe.cookingTime} min</span>
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase ${difficultyColors[recipe.difficulty] || 'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]'}`}>
          {recipe.difficulty}
        </span>
        {recipe.recommendationScore && (
          <div className="flex items-center text-[var(--color-primary)] bg-[var(--color-primary-soft)] px-2.5 py-1 rounded-lg font-bold">
            <BarChart2 className="w-3.5 h-3.5 mr-1" />
            <span>{recipe.recommendationScore}% Match</span>
          </div>
        )}
      </div>
    </div>
  );

  if (onClick) return cardBody;
  return <Link to={`/recipes/${id}`} className="block h-full">{cardBody}</Link>;
}
