import api from "./api";

export async function getFees(params = {}) {
  const response = await api.get("/fees", {
    params,
  });

  return response.data.data;
}

export async function getFeeById(id) {
  const response = await api.get(`/fees/${id}`);

  return response.data.data;
}

export async function getMyFee() {
  const response = await api.get("/fees/my");

  return response.data.data;
}

export async function setStudentFee(studentId, data) {
  const response = await api.put(`/fees/student/${studentId}`, data);

  return response.data;
}

export async function setFeeForAllStudents(data) {
  const response = await api.put("/fees/all", data);

  return response.data;
}

export async function recordPayment(feeId, data) {
  const response = await api.post(`/fees/${feeId}/payment`, data);

  return response.data;
}

export async function getPaymentHistory(feeId) {
  const response = await api.get(`/fees/${feeId}/payments`);

  return response.data.data;
}
