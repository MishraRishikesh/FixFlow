import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import HostelToolbar from "../../components/hostel/HostelToolbar";
import HostelTable from "../../components/hostel/HostelTable";

import { getHostels } from "../../services/hostelService";
import useAuth from "../../hooks/useAuth";

function HostelPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");

  const { user } = useAuth();

  const {
    data: hostels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hostels"],
    queryFn: getHostels,
  });

  const filteredHostels = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return hostels;
    }

    return hostels.filter(hostel => {
      return (
        hostel.name?.toLowerCase().includes(search) ||
        hostel.code?.toLowerCase().includes(search)
      );
    });
  }, [hostels, searchTerm]);

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Hostels</h1>
          <p className="text-gray-500">Manage hostel information and status.</p>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          Failed to load hostels.
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hostels</h1>
        <p className="text-gray-500">Manage hostel information and status.</p>
      </div>

      <HostelToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        isAdmin={isAdmin}
      />

      <HostelTable
        hostels={filteredHostels}
        loading={isLoading}
        statusFilter={statusFilter}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default HostelPage;
