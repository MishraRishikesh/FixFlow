// ===============================
// 1. Imports
// ===============================

import { Eye, Pencil, Trash2, UserPlus } from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import PriorityBadge from "../common/PriorityBadge";

// ===============================
// 2. Component
// ===============================

function ComplaintTableRow({ complaint, onView, onAssign, onEdit, onDelete }) {
  return (
    <tr className="border-t hover:bg-slate-50">
      <td className="px-6 py-4 font-medium">{complaint.title}</td>

      <td className="px-6 py-4 capitalize">{complaint.category}</td>

      <td className="px-6 py-4">
        {complaint.assignedWorker?.name ?? (
          <span className="text-slate-400">Not Assigned</span>
        )}
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={complaint.status} />
      </td>

      <td className="px-6 py-4">
        <PriorityBadge priority={complaint.priority} />
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onView}
            className="rounded-lg p-2 hover:bg-slate-100"
            title="View"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={onAssign}
            className="rounded-lg p-2 hover:bg-slate-100"
            title="Assign Worker"
          >
            <UserPlus size={18} />
          </button>

          <button
            onClick={onEdit}
            className="rounded-lg p-2 hover:bg-slate-100"
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
            title="Delete"
          >
            <Trash2 size={18} />
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
