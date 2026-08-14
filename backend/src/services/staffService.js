import Staff from "../models/Staff.js";
import { ROLES } from "../constants/roles.js";
import AppError from "../utils/appError.js";

// ===============================
// 1. Get Staff
// ===============================

const getStaff = async user => {
  return Staff.find({
    hostel: user.hostel,
    role: ROLES.WORKER,
  })
    .select("-password")
    .sort({ isActive: -1, createdAt: -1 });
};

// ===============================
// 2. Get Staff By ID
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
// 3. Create Staff
// ===============================

const createStaff = async (staffData, user) => {
  const { name, email, password, phone } = staffData;

  const normalizedEmail = email?.trim().toLowerCase();

  const existingStaff = await Staff.findOne({
    email: normalizedEmail,
  });

  if (existingStaff) {
    if (!existingStaff.isActive) {
      throw new AppError(
        "A worker with this email already exists but is inactive. Activate the existing worker instead.",
        409,
      );
    }

    throw new AppError("Email already registered.", 409);
  }

  const staff = await Staff.create({
    name,
    email: normalizedEmail,
    password,
    phone,
    role: ROLES.WORKER,
    hostel: user.hostel,
    isHeadWarden: false,
  });

  return staff;
};

// ===============================
// 4. Update Staff
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

  if (email && email.toLowerCase() !== staff.email) {
    const normalizedEmail = email.trim().toLowerCase();

    const existingStaff = await Staff.findOne({
      email: normalizedEmail,
      _id: { $ne: staffId },
    });

    if (existingStaff) {
      throw new AppError("Email already registered.", 409);
    }

    staff.email = normalizedEmail;
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
// 5. Deactivate Staff
// ===============================

const deactivateStaff = async (staffId, user) => {
  const staff = await Staff.findOne({
    _id: staffId,
    hostel: user.hostel,
    role: ROLES.WORKER,
  });

  if (!staff) {
    throw new AppError("Worker not found.", 404);
  }

  if (!staff.isActive) {
    throw new AppError("Worker is already inactive.", 400);
  }

  staff.isActive = false;

  await staff.save();

  return staff;
};

// ===============================
// 6. Activate Staff
// ===============================

const activateStaff = async (staffId, user) => {
  const staff = await Staff.findOne({
    _id: staffId,
    hostel: user.hostel,
    role: ROLES.WORKER,
  });

  if (!staff) {
    throw new AppError("Worker not found.", 404);
  }

  if (staff.isActive) {
    throw new AppError("Worker is already active.", 400);
  }

  staff.isActive = true;

  await staff.save();

  return staff;
};

// ===============================
// 7. Export
// ===============================

export {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deactivateStaff,
  activateStaff,
};
