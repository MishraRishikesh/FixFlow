import Modal from "../common/Modal";

function StudentDetailsModal({ open, onClose, student }) {
  if (!student) return null;

  return (
    <Modal open={open} onClose={onClose} title="Student Details">
      <div className="space-y-5">
        <div>
          <p className="text-sm text-gray-500">Student Name</p>
          <p className="font-medium">{student.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Enrollment Number</p>
          <p className="font-medium">{student.enrollmentNumber || "—"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{student.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{student.phone || "—"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
              student.isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {student.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Joined</p>
          <p className="font-medium">
            {student.createdAt
              ? new Date(student.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "—"}
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default StudentDetailsModal;
