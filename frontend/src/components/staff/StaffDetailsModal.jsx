// ===============================
// 1. Imports
// ===============================

import Modal from "../common/Modal";

// ===============================
// 2. Component
// ===============================

function StaffDetailsModal({ staff, open, onClose }) {
  if (!open || !staff) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} title={staff.name}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Email */}

          <div>
            <p className="text-sm text-gray-500">Email</p>

            <p>{staff.email}</p>
          </div>

          {/* Phone */}

          <div>
            <p className="text-sm text-gray-500">Phone</p>

            <p>{staff.phone || "-"}</p>
          </div>

          {/* Role */}

          <div>
            <p className="text-sm text-gray-500">Role</p>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium capitalize text-blue-700">
              {staff.role}
            </span>
          </div>

          {/* Status */}

          <div>
            <p className="text-sm text-gray-500">Status</p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                staff.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {staff.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Created */}

          <div>
            <p className="text-sm text-gray-500">Created</p>

            <p>
              {new Date(staff.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Updated */}

          <div>
            <p className="text-sm text-gray-500">Last Updated</p>

            <p>
              {new Date(staff.updatedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ===============================
// 3. Export
// ===============================

export default StaffDetailsModal;
