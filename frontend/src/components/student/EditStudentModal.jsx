import Modal from "../common/Modal";
import StudentForm from "./StudentForm";

function EditStudentModal({ open, onClose, student, onSuccess }) {
  if (!student) return null;

  return (
    <Modal open={open} onClose={onClose} title="Edit Student">
      <StudentForm
        key={student._id}
        mode="edit"
        student={student}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}

export default EditStudentModal;
