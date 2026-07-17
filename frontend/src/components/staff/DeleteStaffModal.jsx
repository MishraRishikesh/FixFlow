// ===============================
// 1. Imports
// ===============================

import Modal from "../common/Modal";

// ===============================
// 2. Component
// ===============================

function DeleteStaffModal({ open, onClose, staff, onDelete }) {
  if (!staff) return null;

  return (
    <Modal open={open} onClose={onClose} title="Delete Worker">
      <div className="space-y-6">
        <p className="text-gray-600">
          Are you sure you want to remove
          <span className="font-semibold"> {staff.name}</span>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ===============================
// 3. Export
// ===============================

export default DeleteStaffModal;
