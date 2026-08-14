// ===============================
// 1. Imports
// ===============================

import { useEffect, useState } from "react";

import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentComplaints from "../../components/dashboard/RecentComplaints";
import QuickActions from "../../components/dashboard/QuickActions";

import { getDashboard } from "../../services/dashboardService";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";

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
    <div className="space-y-6">
      <StatsGrid stats={dashboard.stats} />

      <DashboardCharts charts={dashboard.charts} />
      <ActivityTimeline activities={dashboard.recentActivity} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentComplaints complaints={dashboard.recentComplaints} />

        <QuickActions />
      </div>
    </div>
  );
}

export default DashboardPage;
