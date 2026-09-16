import { useState, useEffect } from 'react';
import { Plus, Search, Package } from 'lucide-react';
import { useIngredients } from '../hooks/useIngredients';
import IngredientCard from '../components/ingredient/IngredientCard';
import IngredientModal from '../components/ingredient/IngredientModal';

const CATEGORIES = ['All', 'Meat', 'Seafood', 'Vegetable', 'Fruit', 'Dairy/Protein', 'Grain', 'Spice', 'Sauce', 'Oil', 'Other'];

export default function RefrigeratorPage() {
  const { ingredients, loading, error, fetchIngredients, createIngredient, updateIngredient, deleteIngredient } = useIngredients();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [modalState, setModalState] = useState({ isOpen: false, ingredient: null });

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const list = Array.isArray(ingredients) ? ingredients : [];
  const filtered = list.filter(i => {
    const matchSearch = (i.name || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || i.category === category;
    return matchSearch && matchCat;
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Refrigerator</h1>
          <p className="text-gray-500 text-sm">Manage your inventory</p>
        </div>
        <button onClick={() => setModalState({ isOpen: true, ingredient: null })} className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm flex items-center">
          <Plus className="w-4 h-4 mr-1" /> Add Ingredient
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Search ingredients..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm shadow-sm" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${category === c ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="text-red-500 bg-red-50 p-4 rounded-xl text-center">{error}</div>}

      {loading && !ingredients.length ? (
        <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No ingredients found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your filters or add a new ingredient.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(ing => (
            <IngredientCard key={ing.id || ing._id} ingredient={ing} onEdit={() => setModalState({ isOpen: true, ingredient: ing })} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <IngredientModal isOpen={modalState.isOpen} onClose={() => setModalState({ isOpen: false, ingredient: null })} ingredient={modalState.ingredient} onSuccess={handleSave} />
    </div>
  );
}
