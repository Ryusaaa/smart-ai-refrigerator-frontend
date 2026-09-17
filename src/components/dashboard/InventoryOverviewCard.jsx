// client/src/components/dashboard/InventoryOverviewCard.jsx
// Inventory Overview matching the reference dashboard photo
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ChevronRight, Apple, Salad, Milk, MoreHorizontal, Package } from 'lucide-react';
import ExpiryBadge from '../ingredient/ExpiryBadge';

export default function InventoryOverviewCard({
  totalCount = 0,
  categories = [],
  expiringItems = [],
}) {
  // Map standard category counts
  const getCatCount = (name) => {
    const found = categories.find((c) => c.name.toLowerCase().includes(name.toLowerCase()));
    return found ? found.count : 0;
  };

  const vegCount = getCatCount('veg') || getCatCount('vegetable');
  const fruitCount = getCatCount('fruit');
  const dairyCount = getCatCount('dairy') || getCatCount('protein');
  const othersCount = categories
    .filter((c) => !['veg', 'fruit', 'dairy'].some((k) => c.name.toLowerCase().includes(k)))
    .reduce((sum, c) => sum + c.count, 0);

  const catPills = [
    { label: 'Vegetables', count: vegCount, icon: Salad, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Fruits', count: fruitCount, icon: Apple, color: 'text-rose-500 bg-rose-500/10' },
    { label: 'Dairy', count: dairyCount, icon: Milk, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Others', count: othersCount, icon: MoreHorizontal, color: 'text-purple-500 bg-purple-500/10' },
  ];

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors flex flex-col justify-between">
      {/* Card Header */}
      <div className="px-5 py-3.5 border-b border-[var(--color-border)] flex justify-between items-center">
        <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">
          Inventory Overview
        </h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] border border-[var(--color-border)]/60">
          {totalCount} items
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Category Icons Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {catPills.map(({ label, count, icon: Icon, color }) => (
            <Link
              key={label}
              to={`/refrigerator?category=${label}`}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--color-surface-alt)]/60 border border-[var(--color-border)]/50 hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface-alt)] transition-all group cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${color}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <span className="text-[11px] font-medium text-[var(--color-text-muted)] text-center truncate w-full">
                {label}
              </span>
              <span className="text-sm font-bold text-[var(--color-text)] mt-0.5">
                {count}
              </span>
            </Link>
          ))}
        </div>

        {/* Low Stock Section Header */}
        <div className="pt-2 border-t border-[var(--color-border)]/60">
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-[var(--color-warning)]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Low Stock & Expiring</span>
            </div>
            <Link
              to="/refrigerator"
              className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center"
            >
              <span>{expiringItems.length} items</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          {/* Expiring / Low Stock Items List */}
          {expiringItems.length === 0 ? (
            <div className="py-4 text-center text-xs text-[var(--color-text-muted)] italic">
              All ingredients are fresh!
            </div>
          ) : (
            <div className="space-y-1.5">
              {expiringItems.slice(0, 3).map((item) => (
                <Link
                  key={item.id || item._id}
                  to={`/refrigerator/${item.id || item._id}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--color-surface-alt)]/50 hover:bg-[var(--color-surface-alt)] border border-[var(--color-border)]/40 transition-colors group"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]/60 flex items-center justify-center flex-shrink-0 text-xs">
                      🥫
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[var(--color-text)] truncate group-hover:text-[var(--color-primary)] transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[var(--color-text-muted)]">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ExpiryBadge
                      status={item.expirationStatus || item.expiryStatus}
                      daysUntilExpiry={item.daysUntilExpiry}
                    />
                    <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
