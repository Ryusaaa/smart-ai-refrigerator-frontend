export default function ExpiryBadge({ status, daysUntilExpiry }) {
  let badgeClass = '';
  let label = '';
  let isPulsing = false;

  switch (status) {
    case 'EXPIRED':
      badgeClass = 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-900';
      label = 'Expired';
      isPulsing = true;
      break;
    case 'CRITICAL':
      badgeClass = 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-900';
      label = daysUntilExpiry === 1 ? '1 day left' : `${daysUntilExpiry} days left`;
      isPulsing = true;
      break;
    case 'SOON':
      badgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-900';
      label = `${daysUntilExpiry} days left`;
      break;
    case 'SAFE':
      badgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900';
      label = daysUntilExpiry !== null && daysUntilExpiry !== undefined ? `${daysUntilExpiry} days left` : 'Safe';
      break;
    case 'NO_EXPIRATION':
    default:
      badgeClass = 'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] border border-[var(--color-border)]';
      label = 'No expiry';
      break;
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap inline-flex items-center tracking-wide ${badgeClass} ${isPulsing ? 'animate-soft-pulse' : ''}`}>
      {label}
    </span>
  );
}
