import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, BarChart2 } from 'lucide-react';
import { recipeApi } from '../services/recipe.api';
import IngredientChecklist from '../components/recipe/IngredientChecklist';
import InstructionsList from '../components/recipe/InstructionsList';

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

  if (loading) return <div className="flex justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mt-20"></div></div>;
  if (error || !recipe) return <div className="text-red-500 text-center">{error || 'Recipe not found'}</div>;

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-8 md:px-10 border-b border-gray-100 bg-gray-50/50">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${difficultyColors[recipe.difficulty] || 'bg-gray-100 text-gray-800'}`}>
              {recipe.difficulty}
            </span>
            {recipe.recommendationScore && (
              <span className="flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-bold uppercase tracking-wider">
                <BarChart2 className="w-3 h-3 mr-1" /> {recipe.recommendationScore}% Match
              </span>
            )}
            <span className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3 h-3 mr-1" /> {recipe.cookingTime} min
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{recipe.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="p-6 md:p-10 col-span-1 bg-gray-50/30">
            <IngredientChecklist ingredients={recipe.ingredients} />
          </div>
          <div className="p-6 md:p-10 col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Instructions</h3>
            <InstructionsList instructions={recipe.instructions} />
          </div>
        </div>
      </div>
    </div>
  );
}
