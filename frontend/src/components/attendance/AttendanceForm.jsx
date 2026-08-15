import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getStudents } from "../../services/studentService";
import { markAttendance } from "../../services/attendanceService";
import { useQuery } from "@tanstack/react-query";

function AttendanceForm({ selectedDate, onSuccess }) {
  const queryClient = useQueryClient();

  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("present");
  const [saving, setSaving] = useState(false);

  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  async function handleSubmit(event) {
    event.preventDefault();

    if (!studentId) {
      toast.error("Please select a student.");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    }

    try {
      setSaving(true);

      const response = await markAttendance({
        studentId,
        date: selectedDate,
        status,
      });

      toast.success(response.message || "Attendance marked successfully.");

      setStudentId("");
      setStatus("present");

      await queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });

      onSuccess?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to mark attendance.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="student"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Student
        </label>

        <select
          id="student"
          value={studentId}
          onChange={event => setStudentId(event.target.value)}
          disabled={saving || isLoading}
          className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          <option value="">
            {isLoading ? "Loading students..." : "Select student"}
          </option>

          {students
            .filter(student => student.isActive)
            .map(student => (
              <option key={student._id} value={student._id}>
                {student.name} — {student.enrollmentNumber}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="attendanceStatus"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Status
        </label>

        <select
          id="attendanceStatus"
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

      <div className="rounded-lg bg-slate-50 p-3 text-sm text-gray-600">
        Attendance date:{" "}
        <span className="font-medium text-gray-800">
          {selectedDate
            ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "—"}
        </span>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving || isLoading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Mark Attendance"}
        </button>
      </div>
    </form>
  );
}

export default AttendanceForm;
