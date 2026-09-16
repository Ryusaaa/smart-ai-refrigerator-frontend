import { Link } from 'react-router-dom';
import ExpiryBadge from '../ingredient/ExpiryBadge';

export default function ExpiringCard({ ingredients = [] }) {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
      <div className="px-6 py-4 border-b border-[var(--color-border)] flex justify-between items-center">
        <h3 className="font-semibold text-lg font-serif text-[var(--color-text)]">Expiring Soon</h3>
        <Link to="/refrigerator" className="text-sm text-[var(--color-primary)] hover:underline font-medium">
          View All
        </Link>
      </div>
      <div className="p-6">
        {ingredients.length === 0 ? (
          <p className="text-[var(--color-text-muted)] text-sm text-center py-6">No ingredients expiring soon. Great job! 🌿</p>
        ) : (
          <ul className="space-y-4">
            {ingredients.map((item) => (
              <li key={item.id || item._id} className="flex justify-between items-center p-2 rounded-xl hover:bg-[var(--color-surface-alt)] transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="text-[var(--color-text)] font-medium">{item.name}</span>
                  <span className="text-[var(--color-text-muted)] text-sm">{item.quantity} {item.unit}</span>
                </div>
                <ExpiryBadge status={item.expirationStatus || item.expiryStatus} daysUntilExpiry={item.daysUntilExpiry} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
