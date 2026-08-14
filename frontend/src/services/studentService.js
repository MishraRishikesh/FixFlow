import api from "./api";

export async function getStudents() {
  const response = await api.get("/students");
  return response.data.data;
}

export async function getStudentById(id) {
  const response = await api.get(`/students/${id}`);
  return response.data.data;
}

export async function createStudent(data) {
  const response = await api.post("/students", data);
  return response.data;
}

export async function updateStudent(id, data) {
  const response = await api.put(`/students/${id}`, data);
  return response.data;
}

export async function deactivateStudent(id) {
  const response = await api.patch(`/students/${id}/deactivate`);
  return response.data;
}

export async function activateStudent(id) {
  const response = await api.patch(`/students/${id}/activate`);
  return response.data;
}
