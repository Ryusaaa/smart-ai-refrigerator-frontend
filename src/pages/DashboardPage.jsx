import { useEffect, useState, useRef } from 'react';
import { Package, AlertTriangle, Grid3X3, Sparkles, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { dashboardApi } from '../services/dashboard.api';
import StatsCard from '../components/dashboard/StatsCard';
import ExpiringCard from '../components/dashboard/ExpiringCard';
import CategorySummary from '../components/dashboard/CategorySummary';
import RefrigeratorStatusCard from '../components/dashboard/RefrigeratorStatusCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import RecommendedRecipesCard from '../components/dashboard/RecommendedRecipesCard';
import ReduceWasteBanner from '../components/dashboard/ReduceWasteBanner';
import AIAssistantPanel from '../components/dashboard/AIAssistantPanel';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';
import { gsap } from '../lib/gsap';

// Greeting based on current hour
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-56 rounded-xl skeleton-shimmer" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[1,2,3].map(i => <div key={i} className="h-24 rounded-2xl skeleton-shimmer" />)}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <div className="h-52 rounded-2xl skeleton-shimmer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64 rounded-2xl skeleton-shimmer" />
            <div className="h-64 rounded-2xl skeleton-shimmer" />
          </div>
        </div>
        <div className="h-96 rounded-2xl skeleton-shimmer" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useEntranceAnimation({ y: 12, duration: 0.3 });

  useEffect(() => {
    dashboardApi.get()
      .then(res => setData(res?.data || res))
      .catch(err => setError(err.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardSkeleton />;
  if (error) return (
    <div className="text-[var(--color-danger)] text-center p-4 bg-[var(--color-danger-soft)] rounded-2xl border border-[var(--color-danger)]/30 text-sm">
      {error}
    </div>
  );
  if (!data) return null;

  const stats = data.stats || {
    totalIngredients: data.totalIngredients || 0,
    expiringCount: data.expiringCount || 0,
    categoriesCount: data.totalCategories || 0,
  };
  const expiringItems = data.expiringItems || [];
  const categoryBreakdown = data.categoryBreakdown || [];
  const recentlyAdded = data.recentlyAdded || [];
  const recipes = data.recipes || data.recentRecipes || [];

  return (
    <div ref={containerRef} className="space-y-4">
      {/* ── Header Row ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold font-serif text-[var(--color-text)]">
            {getGreeting()}, Ibnu 👋
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Overview of smart refrigerator inventory, freshness, and status
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* System status pill */}
          <span className="flex items-center gap-1.5 bg-[var(--color-success-soft)] text-[var(--color-success)] text-[11px] font-semibold px-3 py-1.5 rounded-full border border-[var(--color-success)]/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            System Online
          </span>
          <Link
            to="/recipes"
            className="inline-flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-all shadow-sm"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Generate Recipe
          </Link>
        </div>
      </div>

      {/* ── Stats Row ──────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        <StatsCard title="Total Ingredients" value={stats.totalIngredients} icon={Package} color="blue" />
        <StatsCard title="Expiring Soon" value={stats.expiringCount} icon={AlertTriangle} color={stats.expiringCount > 0 ? 'red' : 'green'} />
        <StatsCard title="Categories" value={stats.categoriesCount} icon={Grid3X3} color="yellow" />
      </div>

      {/* ── Main 2-column Grid ─────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start">

        {/* ─── Left + Center column (2/3) ────────── */}
        <div className="xl:col-span-2 space-y-4">

          {/* Fridge Status Card — full width in its column */}
          <RefrigeratorStatusCard totalIngredients={stats.totalIngredients} />

          {/* Expiring + Category in 2-cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExpiringCard ingredients={expiringItems} />
            <CategorySummary categories={categoryBreakdown} />
          </div>

          {/* Recent Activity + Recommended Recipes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RecentActivityCard items={recentlyAdded} />
            <RecommendedRecipesCard recipes={recipes} />
          </div>

          {/* Reduce Waste Banner — full width */}
          <ReduceWasteBanner expiringCount={stats.expiringCount} />
        </div>

        {/* ─── Right column (1/3): AI Assistant ───── */}
        <div className="xl:col-span-1">
          <AIAssistantPanel />
        </div>
      </div>
    </div>
  );
}
