// ===============================
// 1. Imports
// ===============================

import { Eye, Pencil, Trash2 } from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import PriorityBadge from "../common/PriorityBadge";

// ===============================
// 2. Component
// ===============================

function ComplaintTableRow({ complaint, onView, onEdit, onDelete }) {
  return (
    <tr className="border-t">
      {/* Title */}
      <td className="px-6 py-4">{complaint.title}</td>

      {/* Category */}
      <td className="px-6 py-4 capitalize">{complaint.category}</td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={complaint.status} />
      </td>

      {/* Priority */}
      <td className="px-6 py-4">
        <PriorityBadge priority={complaint.priority} />
      </td>

      {/* Created */}
      <td className="px-6 py-4">
        {new Date(complaint.createdAt).toLocaleDateString("en-IN", {
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

export default ComplaintTableRow;
