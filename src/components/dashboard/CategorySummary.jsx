export default function CategorySummary({ categories = [] }) {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors flex flex-col justify-between">
      <div className="px-5 py-3.5 border-b border-[var(--color-border)]">
        <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">Inventory by Category</h3>
      </div>
      <div className="p-4.5">
        {categories.length === 0 ? (
          <p className="text-[var(--color-text-muted)] text-xs text-center py-6">No categories to display.</p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((cat) => (
              <div key={cat.name} className="flex justify-between items-center bg-[var(--color-surface-alt)] rounded-xl px-3 py-2.5 transition-colors border border-[var(--color-border)]/40">
                <span className="text-[var(--color-text)] font-medium text-xs truncate mr-2">{cat.name}</span>
                <span className="bg-[var(--color-surface)] text-[var(--color-primary)] font-bold py-0.5 px-2 rounded-lg text-[11px] shadow-xs border border-[var(--color-border)]/60 flex-shrink-0">
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
