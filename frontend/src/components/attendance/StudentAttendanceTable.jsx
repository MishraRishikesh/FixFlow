import { Check, Clock3, X } from "lucide-react";

function StudentAttendanceTable({ attendance = [], loading }) {
  const statusConfig = {
    present: {
      label: "Present",
      icon: Check,
      className: "bg-green-100 text-green-700",
    },
    absent: {
      label: "Absent",
      icon: X,
      className: "bg-red-100 text-red-700",
    },
    on_leave: {
      label: "On Leave",
      icon: Clock3,
      className: "bg-yellow-100 text-yellow-700",
    },
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Attendance History</h2>

        <p className="text-sm text-gray-500">Your attendance records.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Marked By
              </th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Loading attendance...
                </td>
              </tr>
            </tbody>
          ) : attendance.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No attendance records found.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {attendance.map(record => {
                const config =
                  statusConfig[record.status] || statusConfig.absent;

                const StatusIcon = config.icon;

                return (
                  <tr key={record._id} className="border-t hover:bg-slate-50">
                    <td className="px-6 py-4">
                      {record.attendanceDate
                        ? new Date(record.attendanceDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "—"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${config.className}`}
                      >
                        <StatusIcon size={15} />
                        {config.label}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {record.markedBy?.name || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default StudentAttendanceTable;
