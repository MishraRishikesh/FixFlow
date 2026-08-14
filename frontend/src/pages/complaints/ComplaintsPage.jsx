import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import ComplaintTable from "../../components/complaint/ComplaintTable";
import ComplaintToolbar from "../../components/complaint/ComplaintToolbar";
import { getComplaints } from "../../services/complaintService";

function ComplaintsPage() {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 10;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "complaints",
      searchTerm,
      statusFilter,
      categoryFilter,
      priorityFilter,
      page,
    ],
    queryFn: () =>
      getComplaints({
        search: searchTerm,
        status: statusFilter === "all" ? "" : statusFilter,
        category: categoryFilter === "all" ? "" : categoryFilter,
        priority: priorityFilter === "all" ? "" : priorityFilter,
        page,
        limit,
        sort: "-createdAt",
      }),
  });

  const complaints = data?.data || [];
  const pagination = data?.pagination || {};

  const totalPages = pagination.pages || 1;

  async function refreshComplaints() {
    await queryClient.invalidateQueries({
      queryKey: ["complaints"],
    });
  }

  function handleSearchChange(value) {
    setSearchTerm(value);
    setPage(1);
  }

  function handleStatusChange(value) {
    setStatusFilter(value);
    setPage(1);
  }

  function handleCategoryChange(value) {
    setCategoryFilter(value);
    setPage(1);
  }

  function handlePriorityChange(value) {
    setPriorityFilter(value);
    setPage(1);
  }

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Complaints</h1>

        <p className="text-gray-500">View and manage hostel complaints.</p>
      </div>

      <ComplaintToolbar
        onComplaintCreated={refreshComplaints}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        statusFilter={statusFilter}
        setStatusFilter={handleStatusChange}
        categoryFilter={categoryFilter}
        setCategoryFilter={handleCategoryChange}
        priorityFilter={priorityFilter}
        setPriorityFilter={handlePriorityChange}
      />

      <ComplaintTable
        complaints={complaints}
        loading={isLoading || isFetching}
        loadComplaints={refreshComplaints}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-gray-500">
            Page {pagination.page || page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintsPage;
