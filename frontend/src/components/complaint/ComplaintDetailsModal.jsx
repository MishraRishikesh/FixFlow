import Modal from "../common/Modal";
import StatusBadge from "../common/StatusBadge";
import PriorityBadge from "../common/PriorityBadge";

function ComplaintDetailsModal({ complaint, open, onClose }) {
  if (!open || !complaint) return null;

  return (
    <Modal
      open={open}
      title="Complaint Details"
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">{complaint.title}</h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <StatusBadge status={complaint.status} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Priority</p>
            <PriorityBadge priority={complaint.priority} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="capitalize">{complaint.category}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p>
              {new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Created By</p>
            <p>{complaint.createdBy?.name || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Assigned Worker</p>
            <p>{complaint.assignedWorker?.name || "Not Assigned"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Assigned By</p>
            <p>{complaint.assignedBy?.name || "Not Assigned"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Assigned At</p>
            <p>
              {complaint.assignedAt
                ? new Date(complaint.assignedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-500">Description</p>

          <div className="rounded-lg border bg-slate-50 p-4">
            <p className="whitespace-pre-wrap leading-relaxed">
              {complaint.description}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ComplaintDetailsModal;
