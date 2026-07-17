// ===============================
// 1. Imports
// ===============================

import Modal from "../common/Modal";

// ===============================
// 2. Component
// ===============================

function CreateStaffModal({ open, onClose, children }) {
  return (
    <Modal open={open} onClose={onClose} title="Add New Worker">
      {children}
    </Modal>
  );
}

// ===============================
// 3. Export
// ===============================

export default CreateStaffModal;
