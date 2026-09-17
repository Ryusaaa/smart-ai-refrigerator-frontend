import { useState, useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

const CATEGORIES = ['Meat', 'Seafood', 'Vegetable', 'Fruit', 'Dairy/Protein', 'Grain', 'Spice', 'Sauce', 'Oil', 'Other'];

export default function IngredientForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetable',
    quantity: 1,
    unit: 'pcs',
    expiryDate: ''
  });

  const cancelBtnRef = useRef(null);
  const saveBtnRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Vegetable',
        quantity: initialData.quantity || 1,
        unit: initialData.unit || 'pcs',
        expiryDate: initialData.expiryDate ? new Date(initialData.expiryDate).toISOString().split('T')[0] : ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePointerDown = (el) => {
    if (el) gsap.to(el, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
  };

  const inputClass = "mt-1.5 block w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-xs focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 sm:text-sm p-2.5 transition-colors outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-muted)]">Ingredient Name</label>
        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClass} placeholder="e.g. Fresh Tomatoes" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-muted)]">Category</label>
        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className={inputClass}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-muted)]">Quantity</label>
          <input required type="number" step="0.01" min="0" value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseFloat(e.target.value)})} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-muted)]">Unit</label>
          <input required type="text" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className={inputClass} placeholder="kg, pcs, ml" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-muted)]">Expiry Date (Optional)</label>
        <input type="date" value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} className={inputClass} />
      </div>
      <div className="flex justify-end space-x-3 pt-5 border-t border-[var(--color-border)]/60">
        <button
          ref={cancelBtnRef}
          onPointerDown={() => handlePointerDown(cancelBtnRef.current)}
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 border border-[var(--color-border)] rounded-xl text-sm font-medium text-[var(--color-text-muted)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-alt)] transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          ref={saveBtnRef}
          onPointerDown={() => handlePointerDown(saveBtnRef.current)}
          type="submit"
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 shadow-sm transition-all cursor-pointer"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Save Ingredient
        </button>
      </div>
    </form>
  );
}
