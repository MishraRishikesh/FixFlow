// ===============================
// 1. Imports
// ===============================

import Modal from "../common/Modal";
import StatusBadge from "../common/StatusBadge";
import PriorityBadge from "../common/PriorityBadge";

// ===============================
// 2. Component
// ===============================

function ComplaintDetailsModal({ complaint, open, onClose }) {
  if (!open || !complaint) {
    return null;
  }

  return (
    <Modal open={open} title={complaint.title} onClose={onClose}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Status</p>

            <StatusBadge status={complaint.status} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Priority</p>

            <PriorityBadge priority={complaint.priority} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Category</p>

            <p className="capitalize">{complaint.category}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Created</p>

            <p>
              {new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-500">Description</p>

          <p className="leading-relaxed">{complaint.description}</p>
        </div>
      </div>
    </Modal>
  );
}

export default ComplaintDetailsModal;
