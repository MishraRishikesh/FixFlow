import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CreateComplaintModal from "./CreateComplaintModal";
import ComplaintForm from "./ComplaintForm";

import useAuth from "../../hooks/useAuth";

function ComplaintToolbar({
  onComplaintCreated,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const canCreateComplaint =
    user?.role === "student" || user?.role === "warden";

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(
    () => location.state?.openCreateComplaint === true,
  );

  useEffect(() => {
    if (!location.state?.openCreateComplaint) {
      return;
    }

    navigate(location.pathname, {
      replace: true,
      state: {},
    });
  }, [location, navigate]);

  function handleComplaintCreated() {
    setIsCreateModalOpen(false);
    onComplaintCreated?.();
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 shadow-sm lg:flex-row lg:items-center">
        {/* Search */}
        <div className="flex-1">
          <label htmlFor="complaint-search" className="sr-only">
            Search complaints
          </label>

          <input
            id="complaint-search"
            type="text"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            placeholder="Search complaints..."
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="complaint-status" className="sr-only">
            Filter by status
          </label>

          <select
            id="complaint-status"
            value={statusFilter}
            onChange={event => setStatusFilter(event.target.value)}
            className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="complaint-category" className="sr-only">
            Filter by category
          </label>

          <select
            id="complaint-category"
            value={categoryFilter}
            onChange={event => setCategoryFilter(event.target.value)}
            className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="electrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
            <option value="cleaning">Cleaning</option>
            <option value="furniture">Furniture</option>
            <option value="internet">Internet</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="complaint-priority" className="sr-only">
            Filter by priority
          </label>

          <select
            id="complaint-priority"
            value={priorityFilter}
            onChange={event => setPriorityFilter(event.target.value)}
            className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* New Complaint */}
        {canCreateComplaint && (
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            New Complaint
          </button>
        )}
      </div>

      <CreateComplaintModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <ComplaintForm onSuccess={handleComplaintCreated} />
      </CreateComplaintModal>
    </>
  );
}

export default ComplaintToolbar;
