
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import LazyImage from '../common/LazyImage';
import { getDifficultyStyle } from '../../utils/difficultyColor';
import { gsap } from '../../lib/gsap';

import { saveViewedRecipe } from '../../utils/recipeHistory';

const BUTTON_STYLE = {
  background: 'linear-gradient(135deg, var(--stardust-a20) 0%, var(--stardust-a10) 100%)',
  color: '#FFFFFF',
};

export default function RecipeSuggestionCard({ recipe }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  if (!recipe) return null;

  const handlePointerDown = (el) => {
    if (el) gsap.to(el, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
  };

  const handleOpenRecipe = () => {
    saveViewedRecipe(recipe);
    navigate(`/recipes/${recipe.id || recipe._id}`, { state: { recipe } });
  };

  return (
    <div
      ref={cardRef}
      className="mt-3.5 p-3.5 bg-[var(--color-surface-alt)] rounded-2xl border border-[var(--color-border)] shadow-xs transition-colors text-[var(--color-text)] flex flex-col sm:flex-row gap-3.5 items-start sm:items-center justify-between animate-recipe-fade-in"
    >
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[var(--color-border)]">
          <LazyImage
            src={recipe.imageUrl}
            alt={recipe.title}
            aspectRatio="aspect-square"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-1.5 mb-1">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              Rekomendasi Menu
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase ${getDifficultyStyle(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
          <h4 className="text-sm font-bold font-serif truncate text-[var(--color-text)]">
            {recipe.title}
          </h4>
          <div className="flex items-center text-[11px] text-[var(--color-text-muted)] mt-0.5">
            <Clock className="w-3 h-3 mr-1 text-[var(--color-primary)]" />
            <span>{recipe.cookingTime} menit</span>
          </div>
        </div>
      </div>

      <button
        onPointerDown={(e) => handlePointerDown(e.currentTarget)}
        onClick={handleOpenRecipe}
        type="button"
        style={BUTTON_STYLE}
        className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold hover:brightness-110 transition-all shadow-xs cursor-pointer flex-shrink-0"
      >
        <span>Lihat Resep Ini</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}