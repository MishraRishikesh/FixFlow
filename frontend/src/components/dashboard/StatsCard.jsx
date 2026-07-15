// ===============================
// 1. Imports
// ===============================

import Card from "../ui/Card";

// ===============================
// 2. Component
// ===============================

function StatsCard({ title, value, color }) {
  return (
    <Card className="p-6">
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h2>
    </Card>
  );
}

export default StatsCard;
