// ===============================
// 1. Imports
// ===============================

import api from "./api";

// ===============================
// 2. Dashboard API
// ===============================

export async function getDashboard() {
  const response = await api.get("/dashboard");

  return response.data.data;
}
