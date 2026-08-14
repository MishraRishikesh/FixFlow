import { Eye, Pencil, RotateCcw, Trash2 } from "lucide-react";

function StudentTableRow({
  student,
  onView,
  onEdit,
  onDeactivate,
  onActivate,
}) {
  const isActive = student.isActive;

  return (
    <tr className="border-t hover:bg-slate-50">
      <td className="px-6 py-4 font-medium">{student.name}</td>

      <td className="px-6 py-4">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-sm font-medium">
          {student.enrollmentNumber || "—"}
        </span>
      </td>

      <td className="px-6 py-4">{student.email}</td>

      <td className="px-6 py-4">{student.phone || "—"}</td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="px-6 py-4">
        {student.createdAt
          ? new Date(student.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "—"}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* View */}
          <button
            onClick={onView}
            className="rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-slate-100 active:scale-95"
            title="View"
          >
            <Eye size={18} />
          </button>

          {/* Active actions */}
          {isActive ? (
            <>
              <button
                onClick={onEdit}
                className="rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-slate-100 active:scale-95"
                title="Edit"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={onDeactivate}
                className="rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-red-50 active:scale-95"
                title="Deactivate"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </>
          ) : (
            /* Inactive action */
            <button
              onClick={onActivate}
              className="rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-green-50 active:scale-95"
              title="Activate"
            >
              <RotateCcw size={18} className="text-green-600" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default StudentTableRow;
