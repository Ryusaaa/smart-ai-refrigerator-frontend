import { useState } from 'react';
import { ChefHat } from 'lucide-react';

export default function PreferencesForm({ onGenerate, loading }) {
  const [prefs, setPrefs] = useState({
    maxCookingTime: 30,
    difficulty: 'any',
    cuisine: '',
    maxMissingIngredients: 2
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(prefs);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
        <ChefHat className="w-5 h-5 mr-2 text-primary-600" />
        Recipe Preferences
      </h3>
      
      <div className="space-y-5">
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Max Cooking Time</span>
            <span className="text-primary-600 font-bold">{prefs.maxCookingTime} min</span>
          </label>
          <input type="range" min="5" max="120" step="5" value={prefs.maxCookingTime} onChange={e => setPrefs({...prefs, maxCookingTime: parseInt(e.target.value)})} className="w-full accent-primary-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select value={prefs.difficulty} onChange={e => setPrefs({...prefs, difficulty: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border">
            <option value="any">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine (Optional)</label>
          <input type="text" value={prefs.cuisine} onChange={e => setPrefs({...prefs, cuisine: e.target.value})} placeholder="e.g. Italian, Mexican, Asian" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border" />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Max Missing Ingredients</span>
            <span className="text-primary-600 font-bold">{prefs.maxMissingIngredients}</span>
          </label>
          <input type="range" min="0" max="5" step="1" value={prefs.maxMissingIngredients} onChange={e => setPrefs({...prefs, maxMissingIngredients: parseInt(e.target.value)})} className="w-full accent-primary-600" />
        </div>
      </div>

      <button type="submit" disabled={loading} className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed">
        {loading ? 'Generating...' : 'Generate AI Recipes'}
      </button>
    </form>
  );
}
