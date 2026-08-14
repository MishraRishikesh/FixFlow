import { Eye, Pencil, RotateCcw, Trash2 } from "lucide-react";

function HostelTableRow({
  hostel,
  onView,
  onEdit,
  onDeactivate,
  onActivate,
  isAdmin,
}) {
  const isActive = hostel.isActive;

  return (
    <tr className="border-t hover:bg-slate-50">
      <td className="px-6 py-4 font-medium">{hostel.name}</td>

      <td className="px-6 py-4">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-sm font-medium">
          {hostel.code}
        </span>
      </td>

      <td className="px-6 py-4">{hostel.capacity}</td>

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
        {new Date(hostel.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* View - Admin + Warden */}

          <button
            onClick={onView}
            className="rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-slate-100 active:scale-95"
            title="View"
          >
            <Eye size={18} />
          </button>

          {/* Admin-only actions */}

          {isAdmin &&
            (isActive ? (
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
              <button
                onClick={onActivate}
                className="rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-green-50 active:scale-95"
                title="Activate"
              >
                <RotateCcw size={18} className="text-green-600" />
              </button>
            ))}
        </div>
      </td>
    </tr>
  );
}

export default HostelTableRow;
