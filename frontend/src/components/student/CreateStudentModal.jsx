import Modal from "../common/Modal";

function CreateStudentModal({ open, onClose, children }) {
  return (
    <Modal open={open} onClose={onClose} title="Add New Student">
      {children}
    </Modal>
  );
}

export default CreateStudentModal;
