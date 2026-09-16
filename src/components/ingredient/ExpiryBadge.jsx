export default function ExpiryBadge({ status, daysUntilExpiry }) {
  let badgeClass = '';
  let label = '';

  switch (status) {
    case 'EXPIRED':
      badgeClass = 'bg-red-100 text-red-800';
      label = 'Expired';
      break;
    case 'CRITICAL':
      badgeClass = 'bg-red-100 text-red-800';
      label = daysUntilExpiry === 1 ? '1 day left' : `${daysUntilExpiry} days left`;
      break;
    case 'SOON':
      badgeClass = 'bg-orange-100 text-orange-800';
      label = `${daysUntilExpiry} days left`;
      break;
    case 'SAFE':
      badgeClass = 'bg-green-100 text-green-800';
      label = `${daysUntilExpiry} days left`;
      break;
    case 'NO_EXPIRATION':
    default:
      badgeClass = 'bg-gray-100 text-gray-800';
      label = 'No expiry';
      break;
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${badgeClass}`}>
      {label}
    </span>
  );
}
