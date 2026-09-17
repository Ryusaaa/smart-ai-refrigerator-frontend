// client/src/components/dashboard/RecommendedRecipesCard.jsx
// Recommended Recipes card matching reference dashboard photo (1 featured + 2 mini)
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Utensils, Sparkles, ChevronRight } from 'lucide-react';
import LazyImage from '../common/LazyImage';

export default function RecommendedRecipesCard({ recipes = [] }) {
  // Default fallback curated recipes if none yet generated
  const defaultRecipes = [
    {
      id: 'rec-feat',
      title: 'Avocado Chicken Salad',
      cookingTime: 15,
      difficulty: 'Easy',
      tag: 'Healthy',
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'rec-mini-1',
      title: 'Tomato Pasta',
      cookingTime: 20,
      difficulty: 'Easy',
      tag: 'Quick',
      imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'rec-mini-2',
      title: 'Fruit Smoothie',
      cookingTime: 10,
      difficulty: 'Easy',
      tag: 'Fresh',
      imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const displayList = recipes.length >= 3 ? recipes : [...recipes, ...defaultRecipes].slice(0, 3);
  const featured = displayList[0];
  const secondary = displayList.slice(1, 3);

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors flex flex-col justify-between">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-[var(--color-border)] flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Utensils className="w-4 h-4 text-[var(--color-primary)]" />
          <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">
            Recommended Recipes
          </h3>
        </div>
        <Link
          to="/recipes"
          className="text-xs text-[var(--color-primary)] hover:underline font-semibold flex items-center"
        >
          <span>View all</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>

      <div className="p-4 space-y-3">
        {/* 1 Large Featured Recipe Card */}
        {featured && (
          <Link
            to={featured.id && !String(featured.id).startsWith('rec-') ? `/recipes/${featured.id}` : '/recipes'}
            state={{ recipe: featured }}
            className="group block relative rounded-2xl overflow-hidden border border-[var(--color-border)]/60 bg-[var(--color-surface-alt)]/40 hover:shadow-md transition-all"
          >
            <div className="relative h-36 sm:h-40 w-full overflow-hidden">
              <LazyImage
                src={featured.imageUrl}
                alt={featured.title}
                aspectRatio="aspect-auto"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-500/90 text-white backdrop-blur-xs shadow-xs">
                {featured.tag || 'Fresh Pick'}
              </span>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                  {featured.title}
                </h4>
                <p className="text-[11px] text-[var(--color-text-muted)] flex items-center mt-1">
                  <Clock className="w-3 h-3 mr-1 text-[var(--color-primary)]" />
                  {featured.cookingTime || 20} min · {featured.difficulty || 'Easy'}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors flex-shrink-0 ml-2" />
            </div>
          </Link>
        )}

        {/* 2 Mini Recipe Cards Side-by-Side */}
        <div className="grid grid-cols-2 gap-2.5">
          {secondary.map((r, idx) => (
            <Link
              key={r.id || idx}
              to={r.id && !String(r.id).startsWith('rec-') ? `/recipes/${r.id}` : '/recipes'}
              state={{ recipe: r }}
              className="group rounded-xl overflow-hidden border border-[var(--color-border)]/60 bg-[var(--color-surface-alt)]/40 hover:border-[var(--color-primary)]/40 transition-all flex flex-col"
            >
              <div className="h-20 w-full overflow-hidden">
                <LazyImage
                  src={r.imageUrl}
                  alt={r.title}
                  aspectRatio="aspect-auto"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2 flex-1 flex flex-col justify-between">
                <p className="text-xs font-semibold text-[var(--color-text)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                  {r.title}
                </p>
                <p className="text-[10px] text-[var(--color-text-muted)] flex items-center mt-1">
                  <Clock className="w-2.5 h-2.5 mr-1" />
                  {r.cookingTime || 15} min
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
