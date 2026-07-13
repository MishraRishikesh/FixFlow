// ===============================
// 1. Imports
// ===============================

import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

// ===============================
// 2. Component
// ===============================

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// ===============================
// 3. Export
// ===============================

export default ProtectedRoute;
