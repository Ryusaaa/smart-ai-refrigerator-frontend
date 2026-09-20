// client/src/pages/DashboardPage.jsx
// Complete responsive dashboard recreating the reference design (media_1789541774784.png)
import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../services/dashboard.api';
import RefrigeratorStatusCard from '../components/dashboard/RefrigeratorStatusCard';
import TemperatureTrendCard from '../components/dashboard/TemperatureTrendCard';
import InventoryOverviewCard from '../components/dashboard/InventoryOverviewCard';
import RecentActivityCard from '../components/dashboard/RecentActivityCard';
import RecommendedRecipesCard from '../components/dashboard/RecommendedRecipesCard';
import ReduceWasteBanner from '../components/dashboard/ReduceWasteBanner';
import AIAssistantPanel from '../components/dashboard/AIAssistantPanel';
import { useEntranceAnimation } from '../hooks/useEntranceAnimation';
import { useAuth } from '../hooks/useAuth';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}


function getFirstName(fullName) {
  return (fullName || '').trim().split(/\s+/)[0] || '';
}

function getFormattedTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}


function DashboardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 w-72 rounded-xl skeleton-shimmer" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-64 rounded-2xl skeleton-shimmer" />
            <div className="h-64 rounded-2xl skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useEntranceAnimation({ y: 12, duration: 0.3 });

  useEffect(() => {
    dashboardApi
      .get()
      .then((res) => setData(res?.data || res))
      .catch((err) => setError(err.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardSkeleton />;
  if (error) {
    return (
      <div className="text-[var(--color-danger)] text-center p-4 bg-[var(--color-danger-soft)] rounded-2xl border border-[var(--color-danger)]/30 text-sm">
        {error}
      </div>
    );
  }
  if (!data) return null;

  const firstName = getFirstName(user?.name);
  const totalIngredients = data.totalIngredients || data.stats?.totalIngredients || 0;
  const expiringCount = data.expiringCount || data.stats?.expiringCount || 0;
  const expiringItems = data.expiringItems || [];
  const categoryBreakdown = data.categoryBreakdown || [];
  const recentlyAdded = data.recentlyAdded || [];
  const recipes = data.recipes || data.recentRecipes || [];

  return (
    <div ref={containerRef} className="space-y-6 sm:space-y-7 pb-8">
      {/* ── Header Row (Matching Reference Photo) ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[var(--color-text)] tracking-tight">
            {getGreeting()}{firstName ? `, ${firstName}` : ''} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
            Your smart refrigerator is running smoothly. Here's what's happening today.
          </p>
        </div>
        <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-[var(--color-success)] bg-[var(--color-success-soft)] border border-[var(--color-success)]/20 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            All Systems Normal
          </span>
          <span className="text-[10px] text-[var(--color-text-muted)]">
            Last updated {getFormattedTime()}
          </span>
        </div>
      </div>

      {/* ── Main 3-Column Grid Layout ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6.5 items-start">
        {/* ─── Column 1: Refrigerator Status + Temperature Trend ───────────── */}
        <div className="space-y-6 flex flex-col">
          <RefrigeratorStatusCard totalIngredients={totalIngredients} />
          <TemperatureTrendCard />
        </div>

        {/* ─── Column 2: Inventory Overview + Recent Activity ───────────────── */}
        <div className="space-y-6 flex flex-col">
          <InventoryOverviewCard
            totalCount={totalIngredients}
            categories={categoryBreakdown}
            expiringItems={expiringItems}
          />
          <RecentActivityCard items={recentlyAdded} />
        </div>

        {/* ─── Column 3: AI Assistant + Recommended Recipes ─────────────────── */}
        <div className="space-y-6 flex flex-col">
          <AIAssistantPanel />
          <RecommendedRecipesCard recipes={recipes} />
        </div>
      </div>

      {/* ── Bottom Section: Reduce Food Waste Banner ────────────────────────── */}
      <div className="w-full">
        <ReduceWasteBanner expiringCount={expiringCount} />
      </div>
    </div>
  );
}
