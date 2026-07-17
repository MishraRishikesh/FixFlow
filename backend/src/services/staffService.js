// ===============================
// 1. Imports
// ===============================

import Staff from "../models/Staff.js";
import { ROLES } from "../constants/roles.js";
import AppError from "../utils/appError.js";

// ===============================
// 2. Get Staff
// ===============================

const getStaff = async user => {
  return Staff.find({
    hostel: user.hostel,
    role: ROLES.WORKER,
    isActive: true,
  })
    .select("-password")
    .sort({ createdAt: -1 });
};

// ===============================
// 3. Get Staff By ID
// ===============================

const getStaffById = async (staffId, user) => {
  const staff = await Staff.findOne({
    _id: staffId,
    hostel: user.hostel,
    role: ROLES.WORKER,
  }).select("-password");

  if (!staff) {
    throw new AppError("Worker not found.", 404);
  }

  return staff;
};

// ===============================
// 4. Create Staff
// ===============================

const createStaff = async (staffData, user) => {
  const { name, email, password, phone } = staffData;

  // Email already exists
  const existingStaff = await Staff.findOne({ email });

  if (existingStaff) {
    throw new AppError("Email already registered.", 409);
  }

  // Create Worker
  const staff = await Staff.create({
    name,
    email,
    password,
    phone,
    role: ROLES.WORKER,
    hostel: user.hostel,
    isHeadWarden: false,
  });

  return staff;
};

// // ===============================
// 5. Update Staff
// ===============================

const updateStaff = async (staffId, staffData, user) => {
  const staff = await Staff.findOne({
    _id: staffId,
    hostel: user.hostel,
    role: ROLES.WORKER,
  });

  if (!staff) {
    throw new AppError("Worker not found.", 404);
  }

  const { name, email, phone } = staffData;

  // Duplicate Email Check
  if (email && email !== staff.email) {
    const existingStaff = await Staff.findOne({ email });

    if (existingStaff) {
      throw new AppError("Email already registered.", 409);
    }

    staff.email = email;
  }

  if (name !== undefined) {
    staff.name = name;
  }

  if (phone !== undefined) {
    staff.phone = phone;
  }

  await staff.save();

  return staff;
};

// ===============================
// 6. Delete Staff
// ===============================

const deleteStaff = async (staffId, user) => {
  const staff = await Staff.findOne({
    _id: staffId,
    hostel: user.hostel,
    role: ROLES.WORKER,
  });

  if (!staff) {
    throw new AppError("Worker not found.", 404);
  }

  staff.isActive = false;

  await staff.save();

  return staff;
};

// ===============================
// 7. Export
// ===============================

export { getStaff, getStaffById, createStaff, updateStaff, deleteStaff };
