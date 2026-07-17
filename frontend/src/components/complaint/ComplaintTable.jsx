// ===============================
// 1. Imports
// ===============================

import { useState } from "react";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import EmptyState from "../common/EmptyState";
import TableSkeleton from "../common/TableSkeleton";

import ComplaintTableHeader from "./ComplaintTableHeader";
import ComplaintTableRow from "./ComplaintTableRow";
import ComplaintDetailsModal from "./ComplaintDetailsModal";
import EditComplaintModal from "./EditComplaintModal";
import DeleteComplaintModal from "./DeleteComplaintModal";
import AssignWorkerModal from "./AssignWorkerModal";

import { deleteComplaint } from "../../services/complaintService";

// ===============================
// 2. Component
// ===============================

function ComplaintTable({ complaints, loading, loadComplaints }) {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [selectedWorker, setSelectedWorker] = useState("");

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  async function handleDelete() {
    try {
      const response = await deleteComplaint(selectedComplaint._id);

      toast.success(response.message);

      setDeleteOpen(false);
      setSelectedComplaint(null);

      loadComplaints?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete complaint.",
      );
    }
  }

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
                      setViewOpen(true);
                    }}
                    onAssign={() => {
                      setSelectedComplaint(complaint);
                      setSelectedWorker(complaint.assignedWorker?._id || "");
                      setAssignOpen(true);
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
        open={viewOpen}
        complaint={selectedComplaint}
        onClose={() => {
          setViewOpen(false);
          setSelectedComplaint(null);
        }}
      />

      <AssignWorkerModal
        open={assignOpen}
        complaint={selectedComplaint}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        onClose={() => {
          setAssignOpen(false);
          setSelectedComplaint(null);
          setSelectedWorker("");
        }}
        onSuccess={() => {
          setAssignOpen(false);
          setSelectedComplaint(null);
          setSelectedWorker("");
          loadComplaints?.();
        }}
      />

      <EditComplaintModal
        open={editOpen}
        complaint={selectedComplaint}
        closeEditModal={() => {
          setEditOpen(false);
          setSelectedComplaint(null);
        }}
        onSuccess={() => {
          setEditOpen(false);
          setSelectedComplaint(null);
          loadComplaints?.();
        }}
      />

      <DeleteComplaintModal
        open={deleteOpen}
        complaint={selectedComplaint}
        closeDeleteModal={() => {
          setDeleteOpen(false);
          setSelectedComplaint(null);
        }}
        onDelete={handleDelete}
      />
    </>
  );
}

// ===============================
// 3. Export
// ===============================

export default ComplaintTable;
