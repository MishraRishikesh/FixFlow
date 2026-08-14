import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import EmptyState from "../common/EmptyState";
import TableSkeleton from "../common/TableSkeleton";

import StaffTableHeader from "./StaffTableHeader";
import StaffTableRow from "./StaffTableRow";
import StaffDetailsModal from "./StaffDetailsModal";
import EditStaffModal from "./EditStaffModal";
import DeleteStaffModal from "./DeleteStaffModal";

import { activateStaff, deactivateStaff } from "../../services/staffService";

function StaffTable({ staff, loading, statusFilter }) {
  const queryClient = useQueryClient();

  const [selectedStaff, setSelectedStaff] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredStaff = staff.filter(worker => {
    if (statusFilter === "active") {
      return worker.isActive;
    }

    if (statusFilter === "inactive") {
      return !worker.isActive;
    }

    return true;
  });

  async function handleDelete() {
    try {
      const response = await deactivateStaff(selectedStaff._id);

      toast.success(response.message || "Worker deactivated successfully.");

      setDeleteOpen(false);
      setSelectedStaff(null);

      await queryClient.invalidateQueries({
        queryKey: ["staff"],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to deactivate worker.",
      );
    }
  }

  async function handleActivate(worker) {
    try {
      const response = await activateStaff(worker._id);

      toast.success(response.message || "Worker activated successfully.");

      await queryClient.invalidateQueries({
        queryKey: ["staff"],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to activate worker.",
      );
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
              {filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8">
                    <EmptyState
                      title="No workers found"
                      description="Add your first worker to get started."
                    />
                  </td>
                </tr>
              ) : (
                filteredStaff.map(worker => (
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
                    onActivate={() => handleActivate(worker)}
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
        onSuccess={async () => {
          setEditOpen(false);
          setSelectedStaff(null);

          await queryClient.invalidateQueries({
            queryKey: ["staff"],
          });
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
