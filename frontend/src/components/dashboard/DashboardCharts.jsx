import ChartCard from "./ChartCard";

function DashboardCharts({ charts }) {
  if (!charts) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <ChartCard title="Complaint Status" type="pie" data={charts.status} />

      <ChartCard
        title="Complaint Categories"
        type="bar"
        data={charts.category}
      />

      <ChartCard
        title="Priority Distribution"
        type="bar"
        data={charts.priority}
      />
    </div>
  );
}

export default DashboardCharts;
