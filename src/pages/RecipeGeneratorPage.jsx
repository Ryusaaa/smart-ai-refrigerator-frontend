import { useRecipes } from '../hooks/useRecipes';
import PreferencesForm from '../components/recipe/PreferencesForm';
import RecipeCard from '../components/recipe/RecipeCard';
import { ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
        <h1 className="text-2xl font-bold text-gray-900">Recipe Generator</h1>
        <p className="text-gray-500 text-sm">Create meals based on your current fridge inventory</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <PreferencesForm onGenerate={handleGenerate} loading={loading} />
        </div>
        
        <div className="lg:col-span-8">
          {error && <div className="text-red-500 bg-red-50 p-4 rounded-xl mb-6">{error}</div>}
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-gray-100">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-gray-500 font-medium">AI is crafting perfect recipes for you...</p>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recipes.map(r => (
                <RecipeCard key={r.id || r._id} recipe={r} onClick={() => navigate(`/recipes/${r.id || r._id}`, { state: { recipe: r } })} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-dashed border-gray-300 text-center p-6">
              <ChefHat className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Ready to cook?</h3>
              <p className="text-gray-500 mt-1 max-w-sm">Adjust your preferences on the left and hit generate to get AI-powered recipe suggestions based on what's in your fridge.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
