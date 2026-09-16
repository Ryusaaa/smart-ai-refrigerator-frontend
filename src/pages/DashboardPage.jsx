import { useEffect, useState, useRef } from 'react';
import { Package, AlertTriangle, Grid3X3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardApi } from '../services/dashboard.api';
import StatsCard from '../components/dashboard/StatsCard';
import ExpiringCard from '../components/dashboard/ExpiringCard';
import CategorySummary from '../components/dashboard/CategorySummary';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';
import { gsap } from '../lib/gsap';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const btnRef = useRef(null);

  const containerRef = useEntranceAnimation({ y: 16, duration: 0.35 });

  useEffect(() => {
    dashboardApi.get()
      .then(res => {
        const payload = res?.data || res;
        setData(payload);
      })
      .catch(err => setError(err.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const handlePointerDown = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-48 rounded-xl skeleton-shimmer"></div>
            <div className="h-4 w-64 rounded-lg skeleton-shimmer"></div>
          </div>
          <div className="h-10 w-36 rounded-xl skeleton-shimmer"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 rounded-2xl skeleton-shimmer"></div>
          <div className="h-32 rounded-2xl skeleton-shimmer"></div>
          <div className="h-32 rounded-2xl skeleton-shimmer"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 rounded-2xl skeleton-shimmer"></div>
          <div className="h-64 rounded-2xl skeleton-shimmer"></div>
        </div>
      </div>
    );
  }

  if (error) return <div className="text-[var(--color-danger)] text-center p-4 bg-[var(--color-danger-soft)] rounded-2xl border border-[var(--color-danger)]/30 text-sm">{error}</div>;
  if (!data) return null;

  const stats = data.stats || {
    totalIngredients: data.totalIngredients || 0,
    expiringCount: data.expiringCount || 0,
    categoriesCount: data.totalCategories || 0,
  };

  const expiringItems = data.expiringItems || [];
  const categoryBreakdown = data.categoryBreakdown || [];

  return (
    <div ref={containerRef} className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-1">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[var(--color-text)]">Kitchen Dashboard</h1>
          <p className="text-[var(--color-text-muted)] text-xs mt-0.5">Overview of smart refrigerator inventory, freshness, and status</p>
        </div>
        <div ref={btnRef} onPointerDown={handlePointerDown}>
          <Link to="/recipes" className="inline-flex items-center space-x-2 bg-[var(--gradient-primary)] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-all shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Recipe</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Ingredients" value={stats.totalIngredients} icon={Package} color="blue" />
        <StatsCard title="Expiring Soon" value={stats.expiringCount} icon={AlertTriangle} color={stats.expiringCount > 0 ? 'red' : 'green'} />
        <StatsCard title="Categories" value={stats.categoriesCount} icon={Grid3X3} color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ExpiringCard ingredients={expiringItems} />
        <CategorySummary categories={categoryBreakdown} />
      </div>
    </div>
  );
}
