import StatsCard from "./StatsCard";

function StatsGrid({ stats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Pending Complaints"
        value={stats.pendingComplaints}
        color="text-orange-500"
      />

      <StatsCard
        title="Active Complaints"
        value={stats.activeComplaints}
        color="text-blue-600"
      />

      <StatsCard
        title="Resolved Complaints"
        value={stats.resolvedComplaints}
        color="text-green-600"
      />

      <StatsCard
        title="Workers"
        value={stats.workers}
        color="text-purple-600"
      />
    </div>
  );
}

export default StatsGrid;
