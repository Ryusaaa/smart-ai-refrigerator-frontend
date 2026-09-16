export default function ExpiryBadge({ status, daysUntilExpiry }) {
  let badgeClass = '';
  let label = '';
  let isPulsing = false;

  switch (status) {
    case 'EXPIRED':
      badgeClass = 'bg-[var(--color-danger-soft)] text-[var(--color-danger)] border border-[var(--color-danger)]/30';
      label = 'Expired';
      isPulsing = true;
      break;
    case 'CRITICAL':
      badgeClass = 'bg-[var(--color-danger-soft)] text-[var(--color-danger)] border border-[var(--color-danger)]/30';
      label = daysUntilExpiry === 1 ? '1 day left' : `${daysUntilExpiry} days left`;
      isPulsing = true;
      break;
    case 'SOON':
      badgeClass = 'bg-[var(--color-warning-soft)] text-[var(--color-warning)] border border-[var(--color-warning)]/30';
      label = `${daysUntilExpiry} days left`;
      break;
    case 'SAFE':
      badgeClass = 'bg-[var(--color-success-soft)] text-[var(--color-success)] border border-[var(--color-success)]/30';
      label = daysUntilExpiry !== null && daysUntilExpiry !== undefined ? `${daysUntilExpiry} days left` : 'Safe';
      break;
    case 'NO_EXPIRATION':
    default:
      badgeClass = 'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] border border-[var(--color-border)]';
      label = 'No expiry';
      break;
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap inline-flex items-center tracking-wide ${badgeClass} ${isPulsing ? 'animate-soft-pulse' : ''}`}>
      {label}
    </span>
  );
}
