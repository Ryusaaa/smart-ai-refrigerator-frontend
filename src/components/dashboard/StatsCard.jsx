export default function StatsCard({ title, value, subtitle, icon: Icon, color = 'green' }) {
  const colorMap = {
    green: 'bg-[var(--color-success-soft)] text-[var(--color-success)] border border-[var(--color-success)]/20',
    yellow: 'bg-[var(--color-warning-soft)] text-[var(--color-warning)] border border-[var(--color-warning)]/20',
    red: 'bg-[var(--color-danger-soft)] text-[var(--color-danger)] border border-[var(--color-danger)]/20',
    blue: 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] border border-[var(--color-primary)]/20',
  };

  return (
      <div className="bg-[var(--color-surface)] rounded-2xl shadow-[var(--shadow-card)] p-4.5 border border-[var(--color-card-border)] transition-colors">      <div className="flex items-center">
        <div className={`p-3 rounded-xl ${colorMap[color] || colorMap.blue} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="ml-3.5 min-w-0 flex-1">
          <h3 className="text-xs font-medium text-[var(--color-text-muted)] truncate">{title}</h3>
          <div className="flex items-baseline mt-0.5">
            <p className="text-2xl font-bold font-serif text-[var(--color-text)]">{value}</p>
            {subtitle && <p className="ml-2 text-xs text-[var(--color-text-muted)] truncate">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
