// client/src/components/dashboard/ReduceWasteBanner.jsx
// Reduce Food Waste banner matching reference dashboard photo
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Sparkles } from 'lucide-react';

export default function ReduceWasteBanner({ expiringCount = 0 }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-500/25 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors shadow-sm">
      {/* Left Info */}
      <div className="flex items-start sm:items-center gap-4 z-10">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <Leaf className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold font-serif text-[var(--color-text)] text-base sm:text-lg">
            Reduce Food Waste
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] max-w-md leading-relaxed">
            {expiringCount > 0
              ? `${expiringCount} items are nearing expiration. AI generated recipes prioritize these so nothing goes to waste.`
              : 'AI monitors expiry dates and recommends smart recipes to help you maintain zero food waste.'}
          </p>
          <div className="pt-2">
            <Link
              to="/recipes"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm group"
            >
              <span>View Suggestions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Visual & Badge */}
      <div className="flex items-center gap-4 flex-shrink-0 z-10">
        <div className="hidden sm:flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-border)] shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[var(--color-text)]">Save Food</p>
            <p className="text-[10px] text-emerald-500 font-semibold">Save the planet</p>
          </div>
        </div>
      </div>

      {/* Background Decorative Gradient */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
