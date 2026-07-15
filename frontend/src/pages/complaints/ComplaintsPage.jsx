import { useEffect, useState } from "react";

import ComplaintTable from "../../components/complaint/ComplaintTable";
import { getComplaints } from "../../services/complaintService";
import ComplaintToolbar from "../../components/complaint/ComplaintToolbar";
import toast from "react-hot-toast";

function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const data = await getComplaints();

        setComplaints(data);
      } catch (error) {
        toast.error("Failed to load complaints.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchComplaints();
  }, []);

  async function loadComplaints() {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (error) {
      toast.error("Failed to load complaints.");
      console.error(error);
    }
  }

  const filteredComplaints = complaints.filter(complaint => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      complaint.title.toLowerCase().includes(search) ||
      complaint.category.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Complaints</h1>

        <p className="text-gray-500">View and manage hostel complaints.</p>
      </div>

      <ComplaintToolbar
        onComplaintCreated={loadComplaints}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <ComplaintTable
        complaints={filteredComplaints}
        loading={loading}
        refreshColoadComplaintsmplaints={loadComplaints}
      />
    </div>
  );
}

export default ComplaintsPage;
