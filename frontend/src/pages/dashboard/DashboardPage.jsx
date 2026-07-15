// ===============================
// 1. Imports
// ===============================

import { useEffect, useState } from "react";

import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentComplaints from "../../components/dashboard/RecentComplaints";
import QuickActions from "../../components/dashboard/QuickActions";

import { getDashboard } from "../../services/dashboardService";

// ===============================
// 2. Component
// ===============================

function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Load Dashboard
  // ===============================

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();

        setDashboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  // ===============================
  // UI
  // ===============================

  return (
    <div className="space-y-8">
      <StatsGrid stats={dashboard.stats} />

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentComplaints complaints={dashboard.recentComplaints} />
        </div>

        <QuickActions />
      </div>
    </div>
  );
}

export default DashboardPage;
