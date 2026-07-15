// ===============================
// 1. Imports
// ===============================

import Modal from "../common/Modal";

// ===============================
// 2. Component
// ===============================

function DeleteComplaintModal({ open, complaint, onClose, onDelete }) {
  if (!complaint) return null;

  return (
    <Modal
      open={open}
      title="Delete Complaint"
      onClose={onClose}
      maxWidth="max-w-md"
    >
      <div className="space-y-6">
        <p className="text-gray-600">
          Are you sure you want to delete
          <span className="font-semibold"> "{complaint.title}"</span>?
        </p>

        <p className="text-sm text-red-500">This action cannot be undone.</p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
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

export default DeleteComplaintModal;
