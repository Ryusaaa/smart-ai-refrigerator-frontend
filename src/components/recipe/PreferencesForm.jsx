import { useState, useRef } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';
import { gsap } from '../../lib/gsap';

export default function PreferencesForm({ onGenerate, loading }) {
  const [prefs, setPrefs] = useState({
    maxCookingTime: 30,
    difficulty: 'any',
    cuisine: '',
    maxMissingIngredients: 2
  });

  const btnRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(prefs);
  };

  const handlePointerDown = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });
    }
  };

  const inputClass = "mt-1.5 block w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-xs focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 sm:text-sm p-2.5 transition-colors outline-none";

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--color-surface)] rounded-3xl shadow-sm border border-[var(--color-border)] p-6 transition-colors">
      <h3 className="text-xl font-bold font-serif text-[var(--color-text)] mb-6 flex items-center">
        <div className="p-2 bg-[var(--color-primary-soft)] text-[var(--color-primary)] rounded-xl mr-3">
          <ChefHat className="w-5 h-5" />
        </div>
        Recipe Preferences
      </h3>
      
      <div className="space-y-5">
        <div>
          <label className="flex justify-between text-sm font-medium text-[var(--color-text-muted)] mb-2">
            <span>Max Cooking Time</span>
            <span className="text-[var(--color-primary)] font-bold">{prefs.maxCookingTime} min</span>
          </label>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={prefs.maxCookingTime}
            onChange={e => setPrefs({...prefs, maxCookingTime: parseInt(e.target.value)})}
            className="w-full accent-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Difficulty</label>
          <select value={prefs.difficulty} onChange={e => setPrefs({...prefs, difficulty: e.target.value})} className={inputClass}>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy (Simple & Fast)</option>
            <option value="medium">Medium (Moderate Skill)</option>
            <option value="hard">Hard (Gourmet)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Cuisine (Optional)</label>
          <input
            type="text"
            value={prefs.cuisine}
            onChange={e => setPrefs({...prefs, cuisine: e.target.value})}
            placeholder="e.g. Italian, Indonesian, Asian"
            className={inputClass}
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-[var(--color-text-muted)] mb-2">
            <span>Max Missing Ingredients</span>
            <span className="text-[var(--color-primary)] font-bold">{prefs.maxMissingIngredients}</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={prefs.maxMissingIngredients}
            onChange={e => setPrefs({...prefs, maxMissingIngredients: parseInt(e.target.value)})}
            className="w-full accent-[var(--color-primary)]"
          />
        </div>
      </div>

      <button
        ref={btnRef}
        onPointerDown={handlePointerDown}
        type="submit"
        disabled={loading}
        className="mt-8 w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-[var(--gradient-primary)] hover:opacity-90 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? 'Crafting Recipes with AI...' : 'Generate AI Recipes'}</span>
      </button>
    </form>
  );
}
