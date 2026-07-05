import Card from "../ui/Card";

function DashboardPreview() {
  return (
    <div className="w-full max-w-[560px]">
      <Card
        className="
        w-full
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-900">
            Hostel Dashboard
          </h3>

          <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            ● Live
          </div>
        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-amber-50 p-4 text-center">
            <p className="text-3xl font-bold text-amber-600">12</p>
            <p className="mt-1 text-sm text-slate-500">Pending</p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">5</p>
            <p className="mt-1 text-sm text-slate-500">Active</p>
          </div>

          <div className="rounded-2xl bg-green-50 p-4 text-center">
            <p className="text-3xl font-bold text-green-600">128</p>
            <p className="mt-1 text-sm text-slate-500">Solved</p>
          </div>
        </div>

        {/* Complaints */}

        <div className="mt-8">
          <h4 className="mb-4 font-semibold text-slate-800">
            Recent Complaints
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <span>🚰 Water Leakage</span>
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <span>📶 Wi-Fi Issue</span>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <span>💡 Electrical Repair</span>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                Solved
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DashboardPreview;
