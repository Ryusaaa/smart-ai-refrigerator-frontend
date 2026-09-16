export default function CategorySummary({ categories = [] }) {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
      <div className="px-6 py-4 border-b border-[var(--color-border)]">
        <h3 className="font-semibold text-lg font-serif text-[var(--color-text)]">Inventory by Category</h3>
      </div>
      <div className="p-6">
        {categories.length === 0 ? (
          <p className="text-[var(--color-text-muted)] text-sm text-center py-6">No categories to display.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <div key={cat.name} className="flex justify-between items-center bg-[var(--color-surface-alt)] rounded-xl p-3.5 transition-colors border border-[var(--color-border)]/40">
                <span className="text-[var(--color-text)] font-medium text-sm">{cat.name}</span>
                <span className="bg-[var(--color-surface)] text-[var(--color-primary)] font-bold py-1 px-2.5 rounded-lg text-xs shadow-xs border border-[var(--color-border)]/60">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
