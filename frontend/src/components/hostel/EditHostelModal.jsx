import Modal from "../common/Modal";
import HostelForm from "./HostelForm";

function EditHostelModal({ open, onClose, hostel, onSuccess }) {
  if (!hostel) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Hostel">
      <HostelForm
        key={hostel._id}
        mode="edit"
        hostel={hostel}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}

export default EditHostelModal;
