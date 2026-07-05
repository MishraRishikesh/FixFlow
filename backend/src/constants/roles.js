// ===============================
// 1. User Roles
// ===============================

export const ROLES = {
  SUPER_ADMIN: "superAdmin",
  ADMIN: "admin",
  WORKER: "worker",
  STUDENT: "student",
};

// ===============================
// 2. Role Values
// Used by Mongoose enum
// ===============================

export const ROLE_VALUES = Object.values(ROLES);
