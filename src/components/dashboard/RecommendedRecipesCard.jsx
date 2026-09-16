// client/src/components/dashboard/RecommendedRecipesCard.jsx
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, ChefHat } from 'lucide-react';
import LazyImage from '../common/LazyImage';

export default function RecommendedRecipesCard({ recipes = [] }) {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
      <div className="px-5 py-3.5 border-b border-[var(--color-border)] flex justify-between items-center">
        <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">Recommended Recipes</h3>
        <Link to="/recipes" className="text-xs text-[var(--color-primary)] hover:underline font-semibold flex items-center">
          <span>View all</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
      <div className="p-4.5">
        {recipes.length === 0 ? (
          <p className="text-[var(--color-text-muted)] text-xs text-center py-6">
            No recipes yet — generate some from your current stock.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recipes.slice(0, 3).map(r => (
              <Link
                key={r.id || r._id}
                to={`/recipes/${r.id || r._id}`}
                state={{ recipe: r }}
                className="group rounded-xl overflow-hidden border border-[var(--color-border)]/60 hover:shadow-md transition-shadow"
              >
                <LazyImage src={r.imageUrl} alt={r.title} aspectRatio="aspect-video" className="w-full" />
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-[var(--color-text)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                    {r.title}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] flex items-center mt-0.5">
                    <Clock className="w-3 h-3 mr-1" /> {r.cookingTime} min · {r.difficulty}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
