// client/src/components/dashboard/ReduceWasteBanner.jsx
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';

export default function ReduceWasteBanner({ expiringCount = 0 }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[var(--color-success)]/25 bg-[var(--color-success-soft)] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-[var(--color-success)] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <Leaf className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold font-serif text-[var(--color-text)] text-sm">Reduce Food Waste</h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            {expiringCount > 0
              ? `${expiringCount} item${expiringCount > 1 ? 's' : ''} expiring soon — use them before they go to waste.`
              : 'AI helps you use ingredients before they expire. A healthier, more sustainable kitchen.'}
          </p>
        </div>
      </div>
      <Link
        to="/refrigerator"
        className="flex-shrink-0 inline-flex items-center space-x-1.5 bg-[var(--color-success)] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
      >
        <span>View Suggestions</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
