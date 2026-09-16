import { useEffect, useState } from 'react';
import { Package, AlertTriangle, Grid3X3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardApi } from '../services/dashboard.api';
import StatsCard from '../components/dashboard/StatsCard';
import ExpiringCard from '../components/dashboard/ExpiringCard';
import CategorySummary from '../components/dashboard/CategorySummary';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dashboardApi.get().then(setData).catch(err => setError(err.message)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;
  if (error) return <div className="text-red-500 text-center p-4 bg-red-50 rounded-xl">{error}</div>;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Overview of your smart refrigerator</p>
        </div>
        <Link to="/recipes" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
          Generate Recipe
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Ingredients" value={data.stats.totalIngredients} icon={Package} color="blue" />
        <StatsCard title="Expiring Soon" value={data.stats.expiringCount} icon={AlertTriangle} color={data.stats.expiringCount > 0 ? 'red' : 'green'} />
        <StatsCard title="Categories" value={data.stats.categoriesCount} icon={Grid3X3} color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpiringCard ingredients={data.expiringItems} />
        <CategorySummary categories={data.categoryBreakdown} />
      </div>
    </div>
  );
}
