import api from "./api";

export async function getAttendance(params = {}) {
  const response = await api.get("/attendance", {
    params,
  });

  return response.data.data;
}

export async function getAttendanceById(id) {
  const response = await api.get(`/attendance/${id}`);

  return response.data.data;
}

export async function markAttendance(data) {
  const response = await api.post("/attendance", data);

  return response.data;
}

export async function updateAttendance(id, data) {
  const response = await api.put(`/attendance/${id}`, data);

  return response.data;
}

export async function getStudentAttendance(studentId, params = {}) {
  const response = await api.get(`/attendance/student/${studentId}`, {
    params,
  });

  return response.data.data;
}

export async function getMyAttendance(params = {}) {
  const response = await api.get("/attendance/my", {
    params,
  });

  return response.data.data;
}
