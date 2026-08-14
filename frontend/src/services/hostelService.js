import api from "./api";

export async function getHostels() {
  const response = await api.get("/hostels");
  return response.data.data;
}

export async function getHostelById(id) {
  const response = await api.get(`/hostels/${id}`);
  return response.data.data;
}

export async function createHostel(data) {
  const response = await api.post("/hostels", data);
  return response.data;
}

export async function updateHostel(id, data) {
  const response = await api.put(`/hostels/${id}`, data);
  return response.data;
}

export async function updateHostelStatus(id, isActive) {
  const response = await api.patch(`/hostels/${id}/status`, {
    isActive,
  });

  return response.data;
}
