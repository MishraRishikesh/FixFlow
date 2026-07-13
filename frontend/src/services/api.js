// ===============================
// 1. Imports
// ===============================

import axios from "axios";

// ===============================
// 2. Axios Instance
// ===============================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

// ===============================
// 3. Request Interceptor
// ===============================

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// ===============================
// 4. Export
// ===============================

export default api;
