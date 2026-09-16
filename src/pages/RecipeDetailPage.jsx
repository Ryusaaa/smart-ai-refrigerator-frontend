import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, BarChart2, ChefHat, Users } from 'lucide-react';
import { recipeApi } from '../services/recipe.api';
import IngredientChecklist from '../components/recipe/IngredientChecklist';
import InstructionsList from '../components/recipe/InstructionsList';

import LazyImage from '../components/common/LazyImage';
import SourceCitation from '../components/chat/SourceCitation';
import { getDifficultyStyle } from '../utils/difficultyColor';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipe, setRecipe] = useState(location.state?.recipe || null);
  const [loading, setLoading] = useState(!recipe);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recipe) {
      recipeApi.getById(id)
        .then(data => setRecipe(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, recipe]);

  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)] mt-20"></div></div>;
  if (error || !recipe) return <div className="text-[var(--color-danger)] text-center p-4 bg-[var(--color-danger-soft)] rounded-2xl border border-[var(--color-danger)]/30">{error || 'Recipe not found'}</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
      </button>

      <div className="bg-[var(--color-surface)] rounded-3xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
        <LazyImage src={recipe.imageUrl} alt={recipe.title} aspectRatio="aspect-video" className="w-full max-h-80" />
        <div className="px-6 py-8 md:px-10 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]/40">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${getDifficultyStyle(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
            {recipe.recommendationScore && (
              <span className="flex items-center px-3 py-1 bg-[var(--color-primary)]/15 text-[var(--color-primary)] rounded-lg text-xs font-bold uppercase tracking-wider">
                <BarChart2 className="w-3.5 h-3.5 mr-1" /> {recipe.recommendationScore}% Match
              </span>
            )}
            <span className="flex items-center px-3 py-1 bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-lg text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 mr-1 text-[var(--color-primary)]" /> {recipe.cookingTime} min
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-[var(--color-text)] mb-4">{recipe.title}</h1>
          <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-3xl mb-4">{recipe.description}</p>
          <SourceCitation sources={recipe.sources} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
          <div className="p-6 md:p-8 col-span-1 bg-[var(--color-surface-alt)]/20">
            <IngredientChecklist ingredients={recipe.ingredients} />
          </div>
          <div className="p-6 md:p-8 col-span-2">
            <h3 className="text-2xl font-bold font-serif text-[var(--color-text)] mb-6">Instructions</h3>
            <InstructionsList instructions={recipe.instructions} />
          </div>
        </div>
      </div>
    </div>
  );
}
