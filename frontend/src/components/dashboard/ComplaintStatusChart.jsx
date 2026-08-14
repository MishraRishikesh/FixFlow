import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import Card from "../ui/Card";

const COLORS = ["#f59e0b", "#3b82f6", "#8b5cf6", "#10b981", "#ef4444"];

function ComplaintStatusChart({ stats = {} }) {
  const data = [
    {
      name: "Pending",
      value: stats.pendingComplaints ?? 0,
    },
    {
      name: "Active",
      value: stats.activeComplaints ?? 0,
    },
    {
      name: "Resolved",
      value: stats.resolvedComplaints ?? 0,
    },
  ];

  return (
    <Card>
      <h2 className="mb-6 text-lg font-semibold">Complaint Status</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default ComplaintStatusChart;
