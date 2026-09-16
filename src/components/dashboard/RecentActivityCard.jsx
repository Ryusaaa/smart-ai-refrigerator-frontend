// client/src/components/dashboard/RecentActivityCard.jsx
// Surfaces `recentlyAdded` from GET /api/dashboard — the backend already
// returns this field but the old DashboardPage never rendered it.
import { Clock, Plus } from 'lucide-react';

function timeAgo(iso) {
  if (!iso) return '';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function RecentActivityCard({ items = [] }) {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
      <div className="px-5 py-3.5 border-b border-[var(--color-border)]">
        <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">Recent Activity</h3>
      </div>
      <div className="p-4.5">
        {items.length === 0 ? (
          <p className="text-[var(--color-text-muted)] text-xs text-center py-6">No recent activity yet.</p>
        ) : (
          <ul className="space-y-1">
            {items.slice(0, 5).map(item => (
              <li key={item.id || item._id} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[var(--color-surface-alt)] transition-colors">
                <div className="w-6 h-6 rounded-lg bg-[var(--color-success-soft)] text-[var(--color-success)] flex items-center justify-center flex-shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs text-[var(--color-text)] flex-1 truncate">
                  Added <strong className="font-semibold">{item.name}</strong>
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] flex items-center flex-shrink-0">
                  <Clock className="w-3 h-3 mr-1" />
                  {timeAgo(item.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
