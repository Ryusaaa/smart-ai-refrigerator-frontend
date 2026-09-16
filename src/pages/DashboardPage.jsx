import { useEffect, useState } from 'react';
import { Package, AlertTriangle, Grid3X3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dashboardApi } from '../services/dashboard.api';
import StatsCard from '../components/dashboard/StatsCard';
import ExpiringCard from '../components/dashboard/ExpiringCard';
import CategorySummary from '../components/dashboard/CategorySummary';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dashboardApi.get()
      .then(res => {
        const payload = res?.data || res;
        setData(payload);
      })
      .catch(err => setError(err.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

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

  if (error) return <div className="text-rose-600 text-center p-5 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900">{error}</div>;
  if (!data) return null;

  const stats = data.stats || {
    totalIngredients: data.totalIngredients || 0,
    expiringCount: data.expiringCount || 0,
    categoriesCount: data.totalCategories || 0,
  };

  const expiringItems = data.expiringItems || [];
  const categoryBreakdown = data.categoryBreakdown || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[var(--color-text)]">Kitchen Dashboard</h1>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">Overview of your smart refrigerator stock & freshness</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/recipes" className="inline-flex items-center space-x-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Generate Recipe</span>
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Ingredients" value={stats.totalIngredients} icon={Package} color="blue" />
        <StatsCard title="Expiring Soon" value={stats.expiringCount} icon={AlertTriangle} color={stats.expiringCount > 0 ? 'red' : 'green'} />
        <StatsCard title="Categories" value={stats.categoriesCount} icon={Grid3X3} color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpiringCard ingredients={expiringItems} />
        <CategorySummary categories={categoryBreakdown} />
      </div>
    </motion.div>
  );
}
