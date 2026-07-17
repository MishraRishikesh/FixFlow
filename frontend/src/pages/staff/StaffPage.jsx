// ===============================
// 1. Imports
// ===============================

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { getStaff } from "../../services/staffService";

import StaffToolbar from "../../components/staff/StaffToolbar";
import StaffTable from "../../components/staff/StaffTable";

// ===============================
// 2. Component
// ===============================

function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  async function refreshStaff() {
    try {
      const data = await getStaff();

      setStaff(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load workers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshStaff();
  }, []);

  const filteredStaff = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return staff.filter(worker => {
      return (
        worker.name.toLowerCase().includes(search) ||
        worker.email.toLowerCase().includes(search)
      );
    });
  }, [staff, searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workers</h1>

        <p className="text-gray-500">Manage hostel maintenance workers.</p>
      </div>

      <StaffToolbar
        refreshStaff={refreshStaff}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <StaffTable
        staff={filteredStaff}
        loading={loading}
        refreshStaff={refreshStaff}
      />
    </div>
  );
}

// ===============================
// 3. Export
// ===============================

export default StaffPage;
