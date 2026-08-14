import api from "./api";

export async function getStaff() {
  const response = await api.get("/staff");
  return response.data.data;
}

export async function getStaffById(id) {
  const response = await api.get(`/staff/${id}`);
  return response.data.data;
}

export async function createStaff(data) {
  const response = await api.post("/staff", data);
  return response.data;
}

export async function updateStaff(id, data) {
  const response = await api.put(`/staff/${id}`, data);
  return response.data;
}

export async function deactivateStaff(id) {
  const response = await api.patch(`/staff/${id}/deactivate`);
  return response.data;
}

export async function activateStaff(id) {
  const response = await api.patch(`/staff/${id}/activate`);
  return response.data;
}
