// ===============================
// 1. Imports
// ===============================

import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

// ===============================
// 2. Context
// ===============================

const AuthContext = createContext();

// ===============================
// 3. Provider
// ===============================

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    // ===============================
    // Load User
    // ===============================

    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  });

  // ===============================
  // Login
  // ===============================

  const login = token => {
    localStorage.setItem("token", token);

    const decodedUser = jwtDecode(token);

    setUser(decodedUser);
  };

  // ===============================
  // Logout
  // ===============================

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  // ===============================
  // Values
  // ===============================

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ===============================
// 5. Export
// ===============================

export { AuthProvider };
export { AuthContext };
