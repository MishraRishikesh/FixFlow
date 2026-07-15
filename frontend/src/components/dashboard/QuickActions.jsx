// ===============================
// 1. Imports
// ===============================

import Card from "../ui/Card";

// ===============================
// 2. Component
// ===============================

function QuickActions() {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <button className="rounded-lg border p-4 text-left transition hover:bg-slate-50">
          ➕ Create Complaint
        </button>

        <button className="rounded-lg border p-4 text-left transition hover:bg-slate-50">
          👷 Manage Staff
        </button>

        <button className="rounded-lg border p-4 text-left transition hover:bg-slate-50">
          🏠 Hostel Details
        </button>

        <button className="rounded-lg border p-4 text-left transition hover:bg-slate-50">
          📊 View Reports
        </button>
      </div>
    </Card>
  );
}

export default QuickActions;
