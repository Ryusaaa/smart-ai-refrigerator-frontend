import { useRecipes } from '../hooks/useRecipes';
import PreferencesForm from '../components/recipe/PreferencesForm';
import RecipeCard from '../components/recipe/RecipeCard';
import { ChefHat, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecipeGeneratorPage() {
  const { recipes, loading, error, generateRecipes } = useRecipes();
  const navigate = useNavigate();

  const handleGenerate = async (prefs) => {
    try {
      await generateRecipes(prefs);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-serif text-[var(--color-text)]">Recipe Generator</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Transform available ingredients into warm home-cooked meals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <PreferencesForm onGenerate={handleGenerate} loading={loading} />
        </div>
        
        <div className="lg:col-span-8">
          {error && (
            <div className="text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200 dark:border-rose-900 mb-6 text-center text-sm">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-80 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] p-8 text-center shadow-xs">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/15 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 text-[var(--color-primary)] animate-spin" style={{ animationDuration: '4s' }} />
                </div>
              </div>
              <h3 className="text-lg font-bold font-serif text-[var(--color-text)] mb-2">
                Crafting Custom Recipes...
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] max-w-md leading-relaxed">
                Analyzing your refrigerator stock, prioritizing expiring items, and calculating flavor pairings.
              </p>
              <div className="w-48 h-1.5 bg-[var(--color-surface-alt)] rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-[var(--color-primary)] rounded-full skeleton-shimmer" style={{ width: '100%' }}></div>
              </div>
            </div>
          ) : recipes.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {recipes.map(r => (
                  <RecipeCard key={r.id || r._id} recipe={r} onClick={() => navigate(`/recipes/${r.id || r._id}`, { state: { recipe: r } })} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-80 bg-[var(--color-surface)] rounded-3xl border border-dashed border-[var(--color-border)] text-center p-8">
              <div className="w-16 h-16 bg-[var(--color-surface-alt)] rounded-full flex items-center justify-center mb-4 text-[var(--color-text-muted)]">
                <ChefHat className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-[var(--color-text)]">Ready to Cook?</h3>
              <p className="text-[var(--color-text-muted)] text-sm mt-1.5 max-w-md leading-relaxed">
                Set your cooking time and preferences on the left, then click <strong className="text-[var(--color-primary)]">Generate AI Recipes</strong> to get tailored suggestions based on your fridge.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
