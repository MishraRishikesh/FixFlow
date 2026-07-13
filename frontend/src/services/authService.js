// ===============================
// 1. Imports
// ===============================

import api from "./api";

// ===============================
// 2. Login
// ===============================

const login = async credentials => {
  const response = await api.post("/auth/login", credentials);

  return response.data;
};

// ===============================
// 3. Export
// ===============================

export { login };
