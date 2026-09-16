import { useState, useEffect, useRef } from 'react';
import { Plus, Search, Package } from 'lucide-react';
import { useIngredients } from '../hooks/useIngredients';
import IngredientCard from '../components/ingredient/IngredientCard';
import IngredientModal from '../components/ingredient/IngredientModal';
import { useStaggerList } from '../hooks/useStaggerList';
import { gsap } from '../lib/gsap';

const CATEGORIES = ['All', 'Meat', 'Seafood', 'Vegetable', 'Fruit', 'Dairy/Protein', 'Grain', 'Spice', 'Sauce', 'Oil', 'Other'];

export default function RefrigeratorPage() {
  const { ingredients, loading, error, fetchIngredients, createIngredient, updateIngredient, deleteIngredient } = useIngredients();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [modalState, setModalState] = useState({ isOpen: false, ingredient: null });
  const addBtnRef = useRef(null);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const list = Array.isArray(ingredients) ? ingredients : [];
  const filtered = list.filter(i => {
    const matchSearch = (i.name || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || i.category === category;
    return matchSearch && matchCat;
  });

  const gridRef = useStaggerList(':scope > *', [filtered.length, category], {
    stagger: 0.04,
    y: 16,
    duration: 0.3,
  });

  const handleSave = async (data) => {
    try {
      if (modalState.ingredient) {
        await updateIngredient(modalState.ingredient.id || modalState.ingredient._id, data);
      } else {
        await createIngredient(data);
      }
      setModalState({ isOpen: false, ingredient: null });
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this ingredient?')) {
      try {
        await deleteIngredient(id);
      } catch (e) {
        alert(e.message);
      }
    }
  };

  const handlePointerDown = (el) => {
    if (el) gsap.to(el, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[var(--color-text)]">Refrigerator Stock</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">Track and manage ingredients stored in your fridge</p>
        </div>
        <button
          ref={addBtnRef}
          onPointerDown={() => handlePointerDown(addBtnRef.current)}
          onClick={() => setModalState({ isOpen: true, ingredient: null })}
          className="bg-[var(--gradient-primary)] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-sm flex items-center space-x-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Ingredient</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)] w-4 h-4" />
          <input
            type="text"
            placeholder="Search ingredients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-sm shadow-xs transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(c => (
            <button
              onPointerDown={(e) => handlePointerDown(e.currentTarget)}
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                category === c
                  ? 'bg-[var(--gradient-primary)] text-white shadow-xs'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="text-[var(--color-danger)] bg-[var(--color-danger-soft)] p-4 rounded-2xl border border-[var(--color-danger)]/30 text-center text-sm">{error}</div>}

      {loading && !ingredients.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-44 rounded-2xl skeleton-shimmer"></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-[var(--color-surface)] rounded-3xl border border-dashed border-[var(--color-border)]">
          <Package className="mx-auto h-12 w-12 text-[var(--color-text-muted)]/50 mb-3" />
          <h3 className="text-lg font-bold font-serif text-[var(--color-text)]">No ingredients found</h3>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">Try adjusting your search filters or add a new ingredient to your inventory.</p>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(ing => (
            <IngredientCard
              key={ing.id || ing._id}
              ingredient={ing}
              onEdit={() => setModalState({ isOpen: true, ingredient: ing })}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <IngredientModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, ingredient: null })}
        ingredient={modalState.ingredient}
        onSuccess={handleSave}
      />
    </div>
  );
}
