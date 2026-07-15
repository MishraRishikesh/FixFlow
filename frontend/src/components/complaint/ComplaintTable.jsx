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

function ComplaintTable({ complaints, loading, refreshComplaints }) {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await deleteComplaint(selectedComplaint._id);

      toast.success(response.message);

      setDeleteOpen(false);
      setOpen(false);
      setEditOpen(false);

      setSelectedComplaint(null);

      if (refreshComplaints) {
        refreshComplaints();
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
        onClose={() => {
          setOpen(false);
          setSelectedComplaint(null);
        }}
      />

      <EditComplaintModal
        open={editOpen}
        complaint={selectedComplaint}
        onClose={() => {
          setEditOpen(false);
          setSelectedComplaint(null);
        }}
        onSuccess={() => {
          setEditOpen(false);
          setSelectedComplaint(null);

          if (refreshComplaints) {
            refreshComplaints();
          }
        }}
      />

      <DeleteComplaintModal
        open={deleteOpen}
        complaint={selectedComplaint}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedComplaint(null);
        }}
        onDelete={handleDelete}
      />
    </>
  );
}

export default ComplaintTable;
