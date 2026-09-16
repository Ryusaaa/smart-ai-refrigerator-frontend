import React, { useRef } from 'react';
import { Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../../lib/gsap';
import LazyImage from '../common/LazyImage';
import { getDifficultyStyle } from '../../utils/difficultyColor';

export default function RecipeCard({ recipe, onClick, index = 0, compact = false }) {
  const id = recipe.id || recipe._id;
  const cardRef = useRef(null);

  // See IngredientCard.jsx for why the stagger delay lives here instead of
  // a container-level ":scope > *" GSAP query.
  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 18,
      duration: 0.35,
      delay: Math.min(index * 0.05, 0.4),
      ease: 'power2.out',
    });
  }, { scope: cardRef, dependencies: [id] });

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

  const cardBody = compact ? (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden hover:shadow-elevated transition-shadow cursor-pointer group flex items-center gap-3.5 p-3"
      onClick={onClick ? () => onClick(recipe) : undefined}
    >
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-[var(--color-border)]/60">
        <LazyImage src={recipe.imageUrl} alt={recipe.title} aspectRatio="aspect-square" className="w-full h-full" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold font-serif text-base text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors truncate">
          {recipe.title}
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] line-clamp-1 mt-0.5 leading-relaxed">
          {recipe.description}
        </p>
        <div className="flex flex-wrap gap-1.5 items-center text-[11px] pt-1.5">
          <div className="flex items-center text-[var(--color-text-muted)] bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-md font-medium">
            <Clock className="w-3 h-3 mr-1 text-[var(--color-primary)]" />
            <span>{recipe.cookingTime} min</span>
          </div>
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase ${getDifficultyStyle(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
          {recipe.recommendationScore && (
            <div className="flex items-center text-[var(--color-primary)] bg-[var(--color-primary-soft)] px-2 py-0.5 rounded-md font-bold">
              <BarChart2 className="w-3 h-3 mr-1" />
              <span>{recipe.recommendationScore}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
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
        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase ${getDifficultyStyle(recipe.difficulty)}`}>
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
