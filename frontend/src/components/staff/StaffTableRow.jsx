// ===============================
// 1. Imports
// ===============================

import { Eye, Pencil, Trash2 } from "lucide-react";

// ===============================
// 2. Component
// ===============================

function StaffTableRow({ staff, onView, onEdit, onDelete }) {
  return (
    <tr className="border-t hover:bg-slate-50">
      {/* Name */}

      <td className="px-6 py-4 font-medium">{staff.name}</td>

      {/* Email */}

      <td className="px-6 py-4">{staff.email}</td>

      {/* Phone */}

      <td className="px-6 py-4">{staff.phone || "-"}</td>

      {/* Role */}

      <td className="px-6 py-4">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium capitalize text-blue-700">
          {staff.role}
        </span>
      </td>

      {/* Created */}

      <td className="px-6 py-4">
        {new Date(staff.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </td>

      {/* Actions */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onView}
            className="rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-slate-100 active:scale-95"
            title="View"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={onEdit}
            className="rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-slate-100 active:scale-95"
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:bg-red-50 active:scale-95"
            title="Delete"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ===============================
// 3. Export
// ===============================

export default StaffTableRow;
