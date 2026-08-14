import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import StaffToolbar from "../../components/staff/StaffToolbar";
import StaffTable from "../../components/staff/StaffTable";

import { getStaff } from "../../services/staffService";

function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");

  const {
    data: staff = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff"],
    queryFn: getStaff,
  });

  const filteredStaff = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return staff;
    }

    return staff.filter(worker => {
      return (
        worker.name?.toLowerCase().includes(search) ||
        worker.email?.toLowerCase().includes(search) ||
        worker.phone?.toLowerCase().includes(search)
      );
    });
  }, [staff, searchTerm]);

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Workers</h1>

          <p className="text-gray-500">Manage hostel maintenance workers.</p>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          Failed to load workers.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workers</h1>

        <p className="text-gray-500">Manage hostel maintenance workers.</p>
      </div>

      <StaffToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <StaffTable
        staff={filteredStaff}
        loading={isLoading}
        statusFilter={statusFilter}
      />
    </div>
  );
}

export default StaffPage;
