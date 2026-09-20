import { useState, useEffect } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import PreferencesForm from '../components/recipe/PreferencesForm';
import RecipeCard from '../components/recipe/RecipeCard';
import RecipeHistoryPanel from '../components/recipe/RecipeHistoryPanel';
import { ChefHat, Sparkles, LayoutGrid, List, History, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';
import {
  getRecipeHistory,
  addRecipeHistoryEntry,
  clearRecipeHistory,
  getViewedRecipes,
  clearViewedRecipes,
} from '../utils/recipeHistory';

export default function RecipeGeneratorPage() {
  const { recipes, loading, error, generateRecipes, setRecipesDirectly } = useRecipes();
  const navigate = useNavigate();

  const containerRef = useEntranceAnimation({ y: 14, duration: 0.3 });

  // Default to large grid view for prominent, beautiful cards
  const [view, setView] = useState('grid');
  const [history, setHistory] = useState(() => getRecipeHistory());
  const [viewedRecipes, setViewedRecipes] = useState(() => getViewedRecipes());

  // Reload history whenever page mounts or recipes change
  useEffect(() => {
    setViewedRecipes(getViewedRecipes());
  }, [recipes]);

  const handleGenerate = async (prefs) => {
    try {
      const result = await generateRecipes(prefs);
      const list = result?.recipes || result || [];
      addRecipeHistoryEntry({ preferences: prefs, recipes: list });
      setHistory(getRecipeHistory());
      setViewedRecipes(getViewedRecipes());
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectHistory = (entry) => {
    if (setRecipesDirectly) setRecipesDirectly(entry.recipes || []);
  };

  const handleClearHistory = () => {
    clearRecipeHistory();
    clearViewedRecipes();
    setHistory([]);
    setViewedRecipes([]);
  };

  // Determine what to display:
  // If active recipes from generation exist, display them;
  // otherwise, display saved/history recipes in large cards!
  const hasActiveRecipes = recipes.length > 0;
  const displayRecipes = hasActiveRecipes ? recipes : viewedRecipes;

  return (
    <div ref={containerRef} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-serif text-[var(--color-text)]">Recipe Generator</h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">
          Transform available ingredients into gourmet home-cooked meals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Preferences Form & Small Search History */}
        <div className="lg:col-span-4 space-y-4">
          <PreferencesForm onGenerate={handleGenerate} loading={loading} />
          {history.length > 0 && (
            <RecipeHistoryPanel
              history={history}
              onSelect={handleSelectHistory}
              onClear={handleClearHistory}
            />
          )}
        </div>

        {/* Right Side: Large Recipe Cards (Generated or Stored History) */}
        <div className="lg:col-span-8">
          {error && (
            <div className="text-[var(--color-danger)] bg-[var(--color-danger-soft)] p-4 rounded-2xl border border-[var(--color-danger)]/30 mb-6 text-center text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center h-80 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] p-8 text-center shadow-xs">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center animate-pulse">
                  <Sparkles
                    className="w-8 h-8 text-[var(--color-primary)] animate-spin"
                    style={{ animationDuration: '4s' }}
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold font-serif text-[var(--color-text)] mb-2">
                Crafting Custom Recipes...
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] max-w-md leading-relaxed">
                Analyzing your refrigerator stock, prioritizing expiring items, and calculating flavor pairings.
              </p>
              <div className="w-48 h-1.5 bg-[var(--color-surface-alt)] rounded-full mt-6 overflow-hidden">
                <div
                  className="h-full bg-[var(--gradient-primary)] rounded-full skeleton-shimmer "
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          ) : displayRecipes.length > 0 ? (
            <div className="space-y-4">
              {/* Header row for the card list */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[var(--color-border)]/60">
                <div className="flex items-center space-x-2">
                  {!hasActiveRecipes && (
                    <History className="w-5 h-5 text-[var(--color-primary)]" />
                  )}
                  <div>
                    <h2 className="text-lg font-bold font-serif text-[var(--color-text)]">
                      {hasActiveRecipes
                        ? `AI Recommended Recipes (${recipes.length})`
                        : `Recipe History (${viewedRecipes.length})`}
                    </h2>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {hasActiveRecipes
                        ? 'Resep terbaik disesuaikan dengan bahan kulkas Anda'
                        : 'Resep masakan yang pernah Anda lihat atau disarankan oleh AI'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!hasActiveRecipes && viewedRecipes.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className="text-xs text-[var(--color-danger)] hover:underline flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-[var(--color-danger-soft)] transition-colors cursor-pointer mr-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus History</span>
                    </button>
                  )}

                  <div className="inline-flex bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-xl p-1 gap-1">
                    <button
                      type="button"
                      onClick={() => setView('grid')}
                      aria-label="Grid view"
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        view === 'grid'
                          ? 'bg-[image:var(--gradient-primary)] text-white shadow-xs'
                          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setView('compact')}
                      aria-label="Compact list view"
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        view === 'compact'
                          ? 'bg-[var(--gradient-primary)] text-white shadow-xs'
                          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Large Recipe Cards Grid */}
              <div
                className={
                  view === 'compact'
                    ? 'flex flex-col gap-3'
                    : 'grid grid-cols-1 md:grid-cols-2 gap-6'
                }
              >
                {displayRecipes.map((r, idx) => (
                  <RecipeCard
                    key={r.id || r._id || idx}
                    recipe={r}
                    index={idx}
                    compact={view === 'compact'}
                    onClick={() =>
                      navigate(`/recipes/${r.id || r._id}`, { state: { recipe: r } })
                    }
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-80 bg-[var(--color-surface)] rounded-3xl border border-dashed border-[var(--color-border)] text-center p-8">
              <div className="w-16 h-16 bg-[var(--color-surface-alt)] rounded-full flex items-center justify-center mb-4 text-[var(--color-text-muted)]">
                <ChefHat className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-[var(--color-text)]">
                Ready to Cook?
              </h3>
              <p className="text-[var(--color-text-muted)] text-sm mt-1.5 max-w-md leading-relaxed">
                Pilih preferensi memasak di sebelah kiri, lalu klik{' '}
                <strong className="text-[var(--color-primary)]">Generate AI Recipes</strong> untuk
                mendapatkan rekomendasi resep terbaik berdasarkan stok kulkas Anda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
