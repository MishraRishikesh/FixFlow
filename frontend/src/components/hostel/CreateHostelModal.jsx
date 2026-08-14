import Modal from "../common/Modal";

function CreateHostelModal({ open, onClose, children }) {
  return (
    <Modal open={open} onClose={onClose} title="Add New Hostel">
      {children}
    </Modal>
  );
}

export default CreateHostelModal;
