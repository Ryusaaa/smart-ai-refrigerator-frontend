import { Link } from 'react-router-dom';
import ExpiryBadge from '../ingredient/ExpiryBadge';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ExpiringCard({ ingredients = [] }) {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors flex flex-col justify-between">
      <div className="px-5 py-3.5 border-b border-[var(--color-border)] flex justify-between items-center">
        <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">Expiring Soon</h3>
        <Link to="/refrigerator" className="text-xs text-[var(--color-primary)] hover:underline font-semibold flex items-center">
          <span>View All</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
      <div className="p-4.5">
        {ingredients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle2 className="w-8 h-8 text-[var(--color-success)] mb-2 opacity-80" />
            <p className="text-[var(--color-text-muted)] text-xs">All ingredients are fresh. Nothing expiring soon.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {ingredients.slice(0, 5).map((item) => (
              <li key={item.id || item._id} className="flex justify-between items-center p-2.5 rounded-xl hover:bg-[var(--color-surface-alt)] transition-colors">
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                  <span className="text-xs font-semibold text-[var(--color-text)] truncate">{item.name}</span>
                  <span className="text-[11px] text-[var(--color-text-muted)] flex-shrink-0">{item.quantity} {item.unit}</span>
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
