// ===============================
// 1. Imports
// ===============================

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Modal from "../common/Modal";

import { getStaff } from "../../services/staffService";
import { assignWorker } from "../../services/complaintService";

// ===============================
// 2. Component
// ===============================

function AssignWorkerModal({
  open,
  complaint,
  selectedWorker,
  setSelectedWorker,
  onClose,
  onSuccess,
}) {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===============================
  // Load workers only when modal opens
  // ===============================

  useEffect(() => {
    if (!open) return;

    async function loadWorkers() {
      try {
        const data = await getStaff();
        setWorkers(data);
      } catch {
        toast.error("Failed to load workers.");
      }
    }

    loadWorkers();
  }, [open]);

  // ===============================
  // Assign Worker
  // ===============================

  async function handleAssign() {
    if (!selectedWorker) {
      toast.error("Please select a worker.");
      return;
    }

    try {
      setLoading(true);

      const response = await assignWorker(complaint._id, selectedWorker);

      toast.success(response.message);

      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to assign worker.");
    } finally {
      setLoading(false);
    }
  }

  if (!open || !complaint) return null;

  return (
    <Modal
      open={open}
      title="Assign Worker"
      onClose={onClose}
      maxWidth="max-w-lg"
    >
      <div className="space-y-5">
        <div>
          <p className="text-sm text-gray-500">Complaint</p>

          <p className="font-medium">{complaint.title}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Worker</label>

          <select
            value={selectedWorker}
            onChange={e => setSelectedWorker(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
          >
            <option value="">Select Worker</option>

            {workers.map(worker => (
              <option key={worker._id} value={worker._id}>
                {worker.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAssign}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Assigning..." : "Assign Worker"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ===============================
// 3. Export
// ===============================

export default AssignWorkerModal;
