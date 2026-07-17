// ===============================
// 1. Imports
// ===============================

import Modal from "../common/Modal";
import StaffForm from "./StaffForm";

// ===============================
// 2. Component
// ===============================

function EditStaffModal({ open, onClose, staff, onSuccess }) {
  if (!staff) return null;

  return (
    <Modal open={open} onClose={onClose} title="Edit Worker">
      <StaffForm mode="edit" staff={staff} onSuccess={onSuccess} />
    </Modal>
  );
}

// ===============================
// 3. Export
// ===============================

export default EditStaffModal;
