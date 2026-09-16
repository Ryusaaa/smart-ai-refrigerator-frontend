import { useState } from 'react';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function IngredientChecklist({ ingredients = [] }) {
  const [checked, setChecked] = useState({});

  const toggleCheck = (idx) => {
    setChecked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const available = ingredients.filter(i => i.available !== false);
  const missing = ingredients.filter(i => i.available === false);

  const renderItem = (ing, idx, isAvailable) => {
    const name = ing.name || ing.ingredientName || '';
    const qty = ing.quantity || ing.amount || '';
    const unit = ing.unit || '';
    const isChecked = checked[`${isAvailable ? 'a' : 'm'}_${idx}`];

    return (
      <li
        key={idx}
        onClick={() => toggleCheck(`${isAvailable ? 'a' : 'm'}_${idx}`)}
        className={`flex items-center gap-2.5 text-sm py-2 px-3 rounded-xl cursor-pointer transition-all select-none ${
          isChecked
            ? 'opacity-50 line-through bg-[var(--color-surface-alt)]/50'
            : 'hover:bg-[var(--color-surface-alt)] active:scale-[0.98]'
        }`}
      >
        {isAvailable ? (
          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 transition-colors ${isChecked ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-success)]'}`} />
        ) : (
          <XCircle className="w-4 h-4 flex-shrink-0 text-[var(--color-danger)]" />
        )}
        <span className="text-[var(--color-text)] flex-1">
          {qty && <span className="font-semibold text-[var(--color-primary)]">{qty} {unit} </span>}
          {name}
        </span>
      </li>
    );
  };

  if (ingredients.length === 0) {
    return (
      <p className="text-sm text-[var(--color-text-muted)] italic">No ingredients listed.</p>
    );
  }

  return (
    <div className="space-y-5">
      <h3 className="text-base font-bold font-serif text-[var(--color-text)]">Bahan-bahan</h3>

      {available.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-success)] mb-2 px-1">
            ✓ Tersedia di kulkas ({available.length})
          </p>
          <ul className="space-y-0.5">
            {available.map((ing, idx) => renderItem(ing, idx, true))}
          </ul>
        </div>
      )}

      {missing.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-danger)] mb-2 px-1">
            ✗ Perlu dibeli ({missing.length})
          </p>
          <ul className="space-y-0.5">
            {missing.map((ing, idx) => renderItem(ing, idx, false))}
          </ul>
        </div>
      )}

      {/* If no available/missing flags, just show all as available */}
      {available.length === 0 && missing.length === 0 && (
        <ul className="space-y-0.5">
          {ingredients.map((ing, idx) => renderItem(ing, idx, true))}
        </ul>
      )}
    </div>
  );
}
