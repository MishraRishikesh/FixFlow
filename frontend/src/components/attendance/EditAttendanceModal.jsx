import { useState } from "react";
import Modal from "../common/Modal";

function EditAttendanceModal({ open, onClose, attendance, onSave, saving }) {
  const [status, setStatus] = useState(attendance?.status || "present");

  if (!attendance) return null;

  return (
    <Modal open={open} onClose={onClose} title="Edit Attendance">
      <div className="space-y-5">
        <div>
          <p className="text-sm text-gray-500">Student</p>

          <p className="font-medium">{attendance.student?.name || "—"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date</p>

          <p className="font-medium">
            {attendance.attendanceDate
              ? new Date(attendance.attendanceDate).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )
              : "—"}
          </p>
        </div>

        <div>
          <label
            htmlFor="editAttendanceStatus"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Attendance Status
          </label>

          <select
            id="editAttendanceStatus"
            value={status}
            onChange={event => setStatus(event.target.value)}
            disabled={saving}
            className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
          >
            <option value="present">Present</option>

            <option value="absent">Absent</option>

            <option value="on_leave">On Leave</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSave(status)}
            disabled={saving || status === attendance.status}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditAttendanceModal;
