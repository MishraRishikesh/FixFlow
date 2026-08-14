import { useQuery } from "@tanstack/react-query";

import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentComplaints from "../../components/dashboard/RecentComplaints";
import QuickActions from "../../components/dashboard/QuickActions";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";

import { getDashboard } from "../../services/dashboardService";

function DashboardPage() {
  const {
    data: dashboard,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (isError || !dashboard) {
    return <div className="p-6 text-red-600">Failed to load dashboard.</div>;
  }

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
