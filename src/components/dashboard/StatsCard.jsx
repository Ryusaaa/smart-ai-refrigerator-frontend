export default function StatsCard({ title, value, subtitle, icon: Icon, color = 'green' }) {
  const colorMap = {
    green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
    yellow: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
    red: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400',
    blue: 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]',
  };

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm p-6 border border-[var(--color-border)] transition-colors">
      <div className="flex items-center">
        <div className={`p-3.5 rounded-xl ${colorMap[color] || colorMap.blue}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-[var(--color-text-muted)]">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold font-serif text-[var(--color-text)]">{value}</p>
            {subtitle && <p className="ml-2 text-sm text-[var(--color-text-muted)]">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
