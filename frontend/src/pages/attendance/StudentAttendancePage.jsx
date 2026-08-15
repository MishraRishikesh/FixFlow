import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import StudentAttendanceSummary from "../../components/attendance/StudentAttendanceSummary";
import StudentAttendanceTable from "../../components/attendance/StudentAttendanceTable";

import { getMyAttendance } from "../../services/attendanceService";

function StudentAttendancePage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-attendance", from, to],
    queryFn: () =>
      getMyAttendance({
        ...(from && { from }),
        ...(to && { to }),
      }),
  });

  const summary = data?.summary || {};
  const attendance = data?.attendance || [];

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Attendance</h1>

          <p className="text-gray-500">
            View your attendance records and percentage.
          </p>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          Failed to load your attendance.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Attendance</h1>

        <p className="text-gray-500">
          View your attendance records and percentage.
        </p>
      </div>

      <StudentAttendanceSummary summary={summary} />

      <div className="flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-sm sm:flex-row sm:items-end">
        <div>
          <label
            htmlFor="attendanceFrom"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            From
          </label>

          <input
            id="attendanceFrom"
            type="date"
            value={from}
            onChange={event => setFrom(event.target.value)}
            className="rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="attendanceTo"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            To
          </label>

          <input
            id="attendanceTo"
            type="date"
            value={to}
            onChange={event => setTo(event.target.value)}
            className="rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {(from || to) && (
          <button
            type="button"
            onClick={() => {
              setFrom("");
              setTo("");
            }}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Clear
          </button>
        )}
      </div>

      <StudentAttendanceTable attendance={attendance} loading={isLoading} />
    </div>
  );
}

export default StudentAttendancePage;
