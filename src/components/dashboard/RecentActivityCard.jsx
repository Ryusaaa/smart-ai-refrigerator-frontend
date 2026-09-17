// client/src/components/dashboard/RecentActivityCard.jsx
// Activity log matching the reference dashboard photo
import React from 'react';
import { Clock, Plus, Thermometer, DoorClosed, ChefHat, ShoppingBag } from 'lucide-react';

function timeAgo(iso) {
  if (!iso) return 'just now';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function RecentActivityCard({ items = [] }) {
  // Built-in telemetry events interleaved with real added items
  const baseActivities = [
    {
      id: 'act-temp',
      type: 'temp',
      icon: Thermometer,
      text: 'Temperature normal (3°C)',
      time: '09:45 AM',
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      id: 'act-chef',
      type: 'recipe',
      icon: ChefHat,
      text: 'Recipe suggestion: Avocado Chicken Salad',
      time: '07:20 AM',
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      id: 'act-door',
      type: 'door',
      icon: DoorClosed,
      text: 'Door closed safely',
      time: '06:15 AM',
      color: 'bg-emerald-500/10 text-emerald-500',
    },
  ];

  // Map real ingredient additions
  const itemActivities = items.slice(0, 3).map((item, idx) => ({
    id: `item-${item.id || idx}`,
    type: 'item',
    icon: Plus,
    text: `You added ${item.name || 'ingredient'}`,
    time: timeAgo(item.createdAt),
    color: 'bg-emerald-500/10 text-emerald-500',
  }));

  const allActivities = [...itemActivities, ...baseActivities].slice(0, 5);

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors flex flex-col justify-between">
      <div className="px-5 py-3.5 border-b border-[var(--color-border)] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-[var(--color-primary)]" />
          <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">
            Recent Activity
          </h3>
        </div>
        <span className="text-[11px] text-[var(--color-text-muted)] font-medium">Real-time</span>
      </div>

      <div className="p-3 sm:p-4">
        <ul className="space-y-1.5">
          {allActivities.map(({ id, icon: Icon, text, time, color }) => (
            <li
              key={id}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[var(--color-surface-alt)]/60 transition-colors"
            >
              <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs text-[var(--color-text)] truncate font-medium">
                  {text}
                </span>
              </div>
              <span className="text-[10px] text-[var(--color-text-muted)] flex-shrink-0 font-mono">
                {time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
