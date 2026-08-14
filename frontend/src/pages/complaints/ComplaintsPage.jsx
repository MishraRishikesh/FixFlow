// ===============================
// 1. Imports
// ===============================

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ComplaintTable from "../../components/complaint/ComplaintTable";
import ComplaintToolbar from "../../components/complaint/ComplaintToolbar";
import { getComplaints } from "../../services/complaintService";

// ===============================
// 2. Component
// ===============================

function ComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ===============================
  // Fetch Complaints
  // ===============================

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["complaints", searchTerm, statusFilter],
    queryFn: () =>
      getComplaints({
        search: searchTerm,
        status: statusFilter === "all" ? "" : statusFilter,
        page: 1,
        limit: 10,
        sort: "-createdAt",
      }),
  });

  // ===============================
  // Error Handling
  // ===============================

  if (isError) {
    toast.error(error?.response?.data?.message || "Failed to load complaints.");
  }

  // ===============================
  // Data
  // ===============================

  const complaints = data?.data || [];

  // ===============================
  // Render
  // ===============================

  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div>
        <h1 className="text-3xl font-bold">Complaints</h1>

        <p className="text-gray-500">View and manage hostel complaints.</p>
      </div>

      {/* Toolbar */}

      <ComplaintToolbar
        onComplaintCreated={refetch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Table */}

      <ComplaintTable
        complaints={complaints}
        loading={isLoading}
        loadComplaints={refetch}
      />
    </div>
  );
}

// ===============================
// 3. Export
// ===============================

export default ComplaintsPage;
