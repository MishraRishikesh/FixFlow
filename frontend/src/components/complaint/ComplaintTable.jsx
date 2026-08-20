import { useState } from "react";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import EmptyState from "../common/EmptyState";
import Modal from "../common/Modal";
import TableSkeleton from "../common/TableSkeleton";
import ComplaintTableHeader from "./ComplaintTableHeader";
import ComplaintTableRow from "./ComplaintTableRow";
import ComplaintDetailsModal from "./ComplaintDetailsModal";
import EditComplaintModal from "./EditComplaintModal";
import DeleteComplaintModal from "./DeleteComplaintModal";
import AssignWorkerModal from "./AssignWorkerModal";

import {
  deleteComplaint,
  updateComplaintStatus,
} from "../../services/complaintService";

import useAuth from "../../hooks/useAuth";

function ComplaintTable({ complaints, loading, loadComplaints }) {
  const { user } = useAuth();

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState("");

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const isWorker = user?.role === "worker";
  const isWarden = user?.role === "warden";

  const nextStatus =
    selectedComplaint?.status === "assigned"
      ? "in_progress"
      : selectedComplaint?.status === "in_progress"
        ? "completed"
        : null;

  const nextStatusLabel =
    nextStatus === "in_progress"
      ? "In Progress"
      : nextStatus === "completed"
        ? "Completed"
        : "";

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

  async function handleStatusUpdate() {
    if (!selectedComplaint || !nextStatus) {
      return;
    }

    try {
      const response = await updateComplaintStatus(
        selectedComplaint._id,
        nextStatus,
      );

      toast.success(response.message);

      setStatusOpen(false);
      setSelectedComplaint(null);

      loadComplaints?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update complaint status.",
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
                    isWorker={isWorker}
                    isWarden={isWarden}
                    onView={() => {
                      setSelectedComplaint(complaint);
                      setViewOpen(true);
                    }}
                    onStatusChange={() => {
                      setSelectedComplaint(complaint);
                      setStatusOpen(true);
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

      <Modal
        open={statusOpen}
        title="Update Complaint Status"
        onClose={() => {
          setStatusOpen(false);
          setSelectedComplaint(null);
        }}
        maxWidth="max-w-md"
      >
        <div className="space-y-5">
          <p className="text-slate-600">
            Change <strong>{selectedComplaint?.title}</strong> from{" "}
            <strong className="capitalize">
              {selectedComplaint?.status?.replace("_", " ")}
            </strong>{" "}
            to <strong>{nextStatusLabel}</strong>?
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setStatusOpen(false);
                setSelectedComplaint(null);
              }}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleStatusUpdate}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ComplaintTable;
