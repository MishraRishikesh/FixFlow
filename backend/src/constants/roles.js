// ===============================
// 1. User Roles
// ===============================

export const ROLES = {
  ADMIN: "admin",
  WARDEN: "warden",
  STUDENT: "student",
  WORKER: "worker",
};

// ===============================
// 2. Role Values
// Used by Mongoose enum
// ===============================

export const ROLE_VALUES = Object.values(ROLES);
