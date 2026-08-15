import { Check, Clock3, Pencil, X } from "lucide-react";

function AttendanceTableRow({ attendance, onEdit }) {
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

  const config = statusConfig[attendance.status] || statusConfig.absent;

  const StatusIcon = config.icon;

  return (
    <tr className="border-t hover:bg-slate-50">
      <td className="px-6 py-4 font-medium">
        {attendance.student?.name || "—"}
      </td>

      <td className="px-6 py-4">
        {attendance.student?.enrollmentNumber || "—"}
      </td>

      <td className="px-6 py-4">
        {attendance.attendanceDate
          ? new Date(attendance.attendanceDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
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

      <td className="px-6 py-4">{attendance.markedBy?.name || "—"}</td>

      <td className="px-6 py-4">
        <button
          onClick={onEdit}
          className="rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-slate-100 active:scale-95"
          title="Edit Attendance"
        >
          <Pencil size={18} />
        </button>
      </td>
    </tr>
  );
}

export default AttendanceTableRow;
