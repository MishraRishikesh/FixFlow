import { Search, Plus } from "lucide-react";
import { useState } from "react";
import CreateComplaintModal from "./CreateComplaintModal";
import ComplaintForm from "./ComplaintForm";

function ComplaintToolbar({
  onComplaintCreated,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search */}

      <div className="relative w-full md:max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search complaints..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Right Side */}

      <div className="flex gap-3">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="rounded-lg border px-4 py-2"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          New Complaint
        </button>
      </div>

      <CreateComplaintModal isOpen={open} onClose={() => setOpen(false)}>
        <ComplaintForm
          onSuccess={() => {
            setOpen(false);
            if (onComplaintCreated) {
              onComplaintCreated();
            }
          }}
        />
      </CreateComplaintModal>
    </div>
  );
}

export default ComplaintToolbar;
