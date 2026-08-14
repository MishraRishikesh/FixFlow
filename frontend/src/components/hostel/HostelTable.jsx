import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import EmptyState from "../common/EmptyState";
import TableSkeleton from "../common/TableSkeleton";

import HostelTableHeader from "./HostelTableHeader";
import HostelTableRow from "./HostelTableRow";
import HostelDetailsModal from "./HostelDetailsModal";
import EditHostelModal from "./EditHostelModal";
import DeleteHostelModal from "./DeleteHostelModal";

import { updateHostelStatus } from "../../services/hostelService";

function HostelTable({ hostels, loading, statusFilter, isAdmin }) {
  const queryClient = useQueryClient();

  const [selectedHostel, setSelectedHostel] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredHostels = hostels.filter(hostel => {
    if (statusFilter === "active") {
      return hostel.isActive;
    }

    if (statusFilter === "inactive") {
      return !hostel.isActive;
    }

    return true;
  });

  async function handleActivate(hostel) {
    try {
      const response = await updateHostelStatus(hostel._id, true);

      toast.success(response.message || "Hostel activated successfully.");

      await queryClient.invalidateQueries({
        queryKey: ["hostels"],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to activate hostel.",
      );
    }
  }

  async function handleDeactivate() {
    try {
      const response = await updateHostelStatus(selectedHostel._id, false);

      toast.success(response.message || "Hostel deactivated successfully.");

      setDeleteOpen(false);
      setSelectedHostel(null);

      await queryClient.invalidateQueries({
        queryKey: ["hostels"],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to deactivate hostel.",
      );
    }
  }

  return (
    <>
      <Card className="overflow-hidden">
        <table className="min-w-full">
          <HostelTableHeader isAdmin={isAdmin} />

          {loading ? (
            <TableSkeleton />
          ) : (
            <tbody>
              {filteredHostels.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="p-8">
                    <EmptyState
                      title="No hostels found"
                      description="No hostels match the current filters."
                    />
                  </td>
                </tr>
              ) : (
                filteredHostels.map(hostel => (
                  <HostelTableRow
                    key={hostel._id}
                    hostel={hostel}
                    isAdmin={isAdmin}
                    onView={() => {
                      setSelectedHostel(hostel);
                      setViewOpen(true);
                    }}
                    onEdit={() => {
                      setSelectedHostel(hostel);
                      setEditOpen(true);
                    }}
                    onDeactivate={() => {
                      setSelectedHostel(hostel);
                      setDeleteOpen(true);
                    }}
                    onActivate={() => handleActivate(hostel)}
                  />
                ))
              )}
            </tbody>
          )}
        </table>
      </Card>

      <HostelDetailsModal
        open={viewOpen}
        hostel={selectedHostel}
        onClose={() => {
          setViewOpen(false);
          setSelectedHostel(null);
        }}
      />

      <EditHostelModal
        open={editOpen}
        hostel={selectedHostel}
        onClose={() => {
          setEditOpen(false);
          setSelectedHostel(null);
        }}
        onSuccess={async () => {
          setEditOpen(false);
          setSelectedHostel(null);

          await queryClient.invalidateQueries({
            queryKey: ["hostels"],
          });
        }}
      />

      <DeleteHostelModal
        open={deleteOpen}
        hostel={selectedHostel}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedHostel(null);
        }}
        onDeactivate={handleDeactivate}
      />
    </>
  );
}

export default HostelTable;
