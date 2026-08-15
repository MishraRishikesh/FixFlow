import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import AttendanceToolbar from "../../components/attendance/AttendanceToolbar";
import AttendanceTable from "../../components/attendance/AttendanceTable";

import { getAttendance } from "../../services/attendanceService";

function getToday() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function WardenAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: attendance = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["attendance", selectedDate],
    queryFn: () =>
      getAttendance({
        date: selectedDate,
      }),
  });

  const filteredAttendance = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return attendance;
    }

    return attendance.filter(
      record =>
        record.student?.name?.toLowerCase().includes(search) ||
        record.student?.enrollmentNumber?.toLowerCase().includes(search),
    );
  }, [attendance, searchTerm]);

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>

          <p className="text-gray-500">
            Manage student attendance for your hostel.
          </p>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          Failed to load attendance.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance</h1>

        <p className="text-gray-500">
          Manage student attendance for your hostel.
        </p>
      </div>

      <AttendanceToolbar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <AttendanceTable attendance={filteredAttendance} loading={isLoading} />
    </div>
  );
}

export default WardenAttendancePage;
