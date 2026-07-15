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
// 3. Create Complaint
// ===============================

export async function createComplaint(data) {
  const response = await api.post("/complaints", data);

  return response.data;
}

// ===============================
// 4. Update Complaint
// ===============================

export async function updateComplaint(id, data) {
  const response = await api.put(`/complaints/${id}`, data);

  return response.data;
}

// ===============================
// 5. Delete Complaint
// ===============================

export async function deleteComplaint(id) {
  const response = await api.delete(`/complaints/${id}`);

  return response.data;
}
