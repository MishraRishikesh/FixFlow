import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import EmptyState from "../common/EmptyState";
import TableSkeleton from "../common/TableSkeleton";

import StudentTableHeader from "./StudentTableHeader";
import StudentTableRow from "./StudentTableRow";
import StudentDetailsModal from "./StudentDetailsModal";
import EditStudentModal from "./EditStudentModal";
import DeleteStudentModal from "./DeleteStudentModal";

import {
  activateStudent,
  deactivateStudent,
} from "../../services/studentService";

function StudentTable({ students, loading, statusFilter }) {
  const queryClient = useQueryClient();

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    if (statusFilter === "active") {
      return student.isActive;
    }

    if (statusFilter === "inactive") {
      return !student.isActive;
    }

    return true;
  });

  async function handleActivate(student) {
    try {
      const response = await activateStudent(student._id);

      toast.success(response.message || "Student activated successfully.");

      await queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to activate student.",
      );
    }
  }

  async function handleDeactivate() {
    if (!selectedStudent) return;

    try {
      const response = await deactivateStudent(selectedStudent._id);

      toast.success(response.message || "Student deactivated successfully.");

      setDeleteOpen(false);
      setSelectedStudent(null);

      await queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to deactivate student.",
      );
    }
  }

  function closeViewModal() {
    setViewOpen(false);
    setSelectedStudent(null);
  }

  function closeEditModal() {
    setEditOpen(false);
    setSelectedStudent(null);
  }

  function closeDeleteModal() {
    setDeleteOpen(false);
    setSelectedStudent(null);
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <StudentTableHeader />

            {loading ? (
              <TableSkeleton />
            ) : (
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8">
                      <EmptyState
                        title="No students found"
                        description="No students match the current filters."
                      />
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(student => (
                    <StudentTableRow
                      key={student._id}
                      student={student}
                      onView={() => {
                        setSelectedStudent(student);
                        setViewOpen(true);
                      }}
                      onEdit={() => {
                        setSelectedStudent(student);
                        setEditOpen(true);
                      }}
                      onDeactivate={() => {
                        setSelectedStudent(student);
                        setDeleteOpen(true);
                      }}
                      onActivate={() => handleActivate(student)}
                    />
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </Card>

      {/* View Student */}
      <StudentDetailsModal
        open={viewOpen}
        student={selectedStudent}
        onClose={closeViewModal}
      />

      {/* Edit Student */}
      <EditStudentModal
        open={editOpen}
        student={selectedStudent}
        onClose={closeEditModal}
        onSuccess={async () => {
          setEditOpen(false);
          setSelectedStudent(null);

          await queryClient.invalidateQueries({
            queryKey: ["students"],
          });
        }}
      />

      {/* Deactivate Student */}
      <DeleteStudentModal
        open={deleteOpen}
        student={selectedStudent}
        onClose={closeDeleteModal}
        onDeactivate={handleDeactivate}
      />
    </>
  );
}

export default StudentTable;
