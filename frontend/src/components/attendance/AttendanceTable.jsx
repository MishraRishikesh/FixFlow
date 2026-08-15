import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import EmptyState from "../common/EmptyState";
import TableSkeleton from "../common/TableSkeleton";

import AttendanceTableHeader from "./AttendanceTableHeader";
import AttendanceTableRow from "./AttendanceTableRow";
import EditAttendanceModal from "./EditAttendanceModal";

import { updateAttendance } from "../../services/attendanceService";

function AttendanceTable({ attendance, loading }) {
  const queryClient = useQueryClient();

  const [selectedAttendance, setSelectedAttendance] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleEdit(record) {
    setSelectedAttendance(record);
    setEditOpen(true);
  }

  function closeEditModal() {
    if (saving) return;

    setEditOpen(false);
    setSelectedAttendance(null);
  }

  async function handleSave(status) {
    if (!selectedAttendance) return;

    try {
      setSaving(true);

      const response = await updateAttendance(selectedAttendance._id, {
        status,
      });

      toast.success(response.message || "Attendance updated successfully.");

      setEditOpen(false);
      setSelectedAttendance(null);

      await queryClient.invalidateQueries({
        queryKey: ["attendance"],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update attendance.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <AttendanceTableHeader />

            {loading ? (
              <TableSkeleton />
            ) : (
              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8">
                      <EmptyState
                        title="No attendance records found"
                        description="No attendance has been marked for the selected date."
                      />
                    </td>
                  </tr>
                ) : (
                  attendance.map(record => (
                    <AttendanceTableRow
                      key={record._id}
                      attendance={record}
                      onEdit={() => handleEdit(record)}
                    />
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>

        {saving && (
          <div className="border-t bg-slate-50 px-6 py-3 text-sm text-gray-500">
            Updating attendance...
          </div>
        )}
      </Card>

      <EditAttendanceModal
        key={selectedAttendance?._id}
        open={editOpen}
        onClose={closeEditModal}
        attendance={selectedAttendance}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
}

export default AttendanceTable;
