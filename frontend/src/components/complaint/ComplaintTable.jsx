import Card from "../ui/Card";
import ComplaintTableHeader from "./ComplaintTableHeader";
import ComplaintTableRow from "./ComplaintTableRow";
import EmptyState from "../common/EmptyState";
import TableSkeleton from "../common/TableSkeleton";
import { useState } from "react";
import ComplaintDetailsModal from "./ComplaintDetailsModal";
import EditComplaintModal from "./EditComplaintModal";
import DeleteComplaintModal from "./DeleteComplaintModal";
import { deleteComplaint } from "../../services/complaintService";
import toast from "react-hot-toast";

function ComplaintTable({ complaints, loading, loadComplaints }) {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function closeViewModal() {
    setOpen(false);
    setSelectedComplaint(null);
  }

  function closeEditModal() {
    setEditOpen(false);
    setSelectedComplaint(null);
  }

  function closeDeleteModal() {
    setDeleteOpen(false);
    setSelectedComplaint(null);
  }

  const handleDelete = async () => {
    try {
      const response = await deleteComplaint(selectedComplaint._id);

      toast.success(response.message);

      setDeleteOpen(false);
      setOpen(false);
      setEditOpen(false);

      setSelectedComplaint(null);

      if (loadComplaints) {
        loadComplaints();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete complaint.",
      );
    }
  };
  return (
    <>
      <Card className="overflow-hidden">
        <table className="min-w-full">
          <ComplaintTableHeader />

          {loading ? (
            <TableSkeleton />
          ) : (
            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8">
                    <EmptyState
                      title="No complaints found"
                      description="Try changing your search or filters."
                    />
                  </td>
                </tr>
              ) : (
                complaints.map(complaint => (
                  <ComplaintTableRow
                    key={complaint._id}
                    complaint={complaint}
                    onView={() => {
                      setSelectedComplaint(complaint);
                      setOpen(true);
                    }}
                    onEdit={() => {
                      setSelectedComplaint(complaint);
                      setEditOpen(true);
                    }}
                    onDelete={() => {
                      setSelectedComplaint(complaint);
                      setDeleteOpen(true);
                    }}
                  />
                ))
              )}
            </tbody>
          )}
        </table>
      </Card>

      <ComplaintDetailsModal
        complaint={selectedComplaint}
        open={open}
        closeViewModal={closeViewModal}
      />

      <EditComplaintModal
        open={editOpen}
        complaint={selectedComplaint}
        closeEditModal={closeEditModal}
        onSuccess={() => {
          setEditOpen(false);
          setSelectedComplaint(null);

          if (loadComplaints) {
            loadComplaints();
          }
        }}
      />

      <DeleteComplaintModal
        open={deleteOpen}
        complaint={selectedComplaint}
        closeDeleteModal={closeDeleteModal}
        onDelete={handleDelete}
      />
    </>
  );
}

export default ComplaintTable;
