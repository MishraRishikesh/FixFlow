import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import StudentToolbar from "../../components/student/StudentToolbar";
import StudentTable from "../../components/student/StudentTable";

import { getStudents } from "../../services/studentService";

function StudentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");

  const {
    data: students = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const filteredStudents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return students;
    }

    return students.filter(
      student =>
        student.name?.toLowerCase().includes(search) ||
        student.enrollmentNumber?.toLowerCase().includes(search) ||
        student.email?.toLowerCase().includes(search) ||
        student.phone?.toLowerCase().includes(search),
    );
  }, [students, searchTerm]);

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>

          <p className="text-gray-500">
            Manage student accounts and information.
          </p>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          Failed to load students.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Students</h1>

        <p className="text-gray-500">
          Manage student accounts and information.
        </p>
      </div>

      <StudentToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <StudentTable
        students={filteredStudents}
        loading={isLoading}
        statusFilter={statusFilter}
      />
    </div>
  );
}

export default StudentPage;
