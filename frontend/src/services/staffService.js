import api from "./api";

// ===============================
// Get Staff
// ===============================

export async function getStaff() {
  const response = await api.get("/staff");

  return response.data.data;
}

// ===============================
// Create Staff
// ===============================

export async function createStaff(data) {
  const response = await api.post("/staff", data);

  return response.data;
}

// ===============================
// Update Staff
// ===============================

export async function updateStaff(id, data) {
  const response = await api.put(`/staff/${id}`, data);

  return response.data;
}

// ===============================
// Delete Staff
// ===============================

export async function deleteStaff(id) {
  const response = await api.delete(`/staff/${id}`);

  return response.data;
}
