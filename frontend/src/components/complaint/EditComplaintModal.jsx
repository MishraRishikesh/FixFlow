// ===============================
// 1. Imports
// ===============================

import Modal from "../common/Modal";
import ComplaintForm from "./ComplaintForm";

// ===============================
// 2. Component
// ===============================

function EditComplaintModal({ open, complaint, onClose, onSuccess }) {
  if (!complaint) return null;

  return (
    <Modal open={open} title="Edit Complaint" onClose={onClose}>
      <ComplaintForm complaint={complaint} mode="edit" onSuccess={onSuccess} />
    </Modal>
  );
}

export default EditComplaintModal;
