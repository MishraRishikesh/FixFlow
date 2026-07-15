import Modal from "../common/Modal";

function CreateComplaintModal({ isOpen, onClose, children }) {
  return (
    <Modal open={isOpen} title="New Complaint" onClose={onClose}>
      {children}
    </Modal>
  );
}

export default CreateComplaintModal;
