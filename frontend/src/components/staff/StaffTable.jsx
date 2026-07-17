// ===============================
// 1. Imports
// ===============================

import { useState } from "react";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import EmptyState from "../common/EmptyState";
import TableSkeleton from "../common/TableSkeleton";

import StaffTableHeader from "./StaffTableHeader";
import StaffTableRow from "./StaffTableRow";
import StaffDetailsModal from "./StaffDetailsModal";
import EditStaffModal from "./EditStaffModal";
import DeleteStaffModal from "./DeleteStaffModal";

import { deleteStaff } from "../../services/staffService";

// ===============================
// 2. Component
// ===============================

function StaffTable({ staff, loading, refreshStaff }) {
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function handleDelete() {
    try {
      const response = await deleteStaff(selectedStaff._id);

      toast.success(response.message || "Worker deleted successfully.");

      setDeleteOpen(false);
      setSelectedStaff(null);

      refreshStaff?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete worker.");
    }
  }

  return (
    <>
      <Card className="overflow-hidden">
        <table className="min-w-full">
          <StaffTableHeader />

          {loading ? (
            <TableSkeleton />
          ) : (
            <tbody>
              {staff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8">
                    <EmptyState
                      title="No workers found"
                      description="Add your first worker to get started."
                    />
                  </td>
                </tr>
              ) : (
                staff.map(worker => (
                  <StaffTableRow
                    key={worker._id}
                    staff={worker}
                    onView={() => {
                      setSelectedStaff(worker);
                      setViewOpen(true);
                    }}
                    onEdit={() => {
                      setSelectedStaff(worker);
                      setEditOpen(true);
                    }}
                    onDelete={() => {
                      setSelectedStaff(worker);
                      setDeleteOpen(true);
                    }}
                  />
                ))
              )}
            </tbody>
          )}
        </table>
      </Card>

      <StaffDetailsModal
        open={viewOpen}
        staff={selectedStaff}
        onClose={() => {
          setViewOpen(false);
          setSelectedStaff(null);
        }}
      />

      <EditStaffModal
        open={editOpen}
        staff={selectedStaff}
        onClose={() => {
          setEditOpen(false);
          setSelectedStaff(null);
        }}
        onSuccess={() => {
          setEditOpen(false);
          setSelectedStaff(null);
          refreshStaff?.();
        }}
      />

      <DeleteStaffModal
        open={deleteOpen}
        staff={selectedStaff}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedStaff(null);
        }}
        onDelete={handleDelete}
      />
    </>
  );
}

export default StaffTable;
