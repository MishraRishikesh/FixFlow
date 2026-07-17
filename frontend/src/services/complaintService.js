// ===============================
// 1. Imports
// ===============================

import api from "./api";

// ===============================
// 2. Get Complaints
// ===============================

export async function getComplaints() {
  const response = await api.get("/complaints");

  return response.data.data;
}

// ===============================
// 3. Get Complaint By ID
// ===============================

export async function getComplaintById(id) {
  const response = await api.get(`/complaints/${id}`);

  return response.data.data;
}

// ===============================
// 4. Create Complaint
// ===============================

export async function createComplaint(data) {
  const response = await api.post("/complaints", data);

  return response.data;
}

// ===============================
// 5. Assign Worker
// ===============================

export async function assignWorker(complaintId, workerId) {
  const response = await api.patch(`/complaints/${complaintId}/assign`, {
    workerId,
  });

  return response.data;
}

// ===============================
// 6. Update Complaint Status
// ===============================

export async function updateComplaintStatus(complaintId, status) {
  const response = await api.patch(`/complaints/${complaintId}/status`, {
    status,
  });

  return response.data;
}

// ===============================
// 7. Update Complaint
// ===============================

export async function updateComplaint(id, data) {
  const response = await api.put(`/complaints/${id}`, data);

  return response.data;
}

// ===============================
// 8. Delete Complaint
// ===============================

export async function deleteComplaint(id) {
  const response = await api.delete(`/complaints/${id}`);

  return response.data;
}
