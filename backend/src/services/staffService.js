// ===============================
// 1. Imports
// ===============================

import Staff from "../models/Staff.js";
import Hostel from "../models/Hostel.js";
import { ROLES } from "../constants/roles.js";
import AppError from "../utils/appError.js";

// ===============================
// 2. Shared Staff Creation
// ===============================

const createStaff = async (staffData, user, role) => {
  const { name, email, password } = staffData;

  // Email already exists
  const existingStaff = await Staff.findOne({ email });

  if (existingStaff) {
    throw new AppError("Email already registered.", 400);
  }

  // Hostel must exist
  const hostel = await Hostel.findById(user.hostel);

  if (!hostel) {
    throw new AppError("Hostel not found.", 404);
  }

  // Hostel must be active
  if (!hostel.isActive) {
    throw new AppError("Hostel is inactive.", 400);
  }

  const staff = await Staff.create({
    name,
    email,
    password,
    role,
    hostel: user.hostel,
    isHeadWarden: false,
  });

  return staff;
};

// ===============================
// 3. Create Warden
// ===============================

const createWarden = async (staffData, user) => {
  return createStaff(staffData, user, ROLES.WARDEN);
};

// ===============================
// 4. Create Student
// ===============================

const createStudent = async (staffData, user) => {
  const { name, enrollmentNumber, email } = staffData;

  // Enrollment Number is required
  if (!enrollmentNumber) {
    throw new AppError("Enrollment number is required.", 400);
  }

  // Email already exists
  const existingStaff = await Staff.findOne({ email });

  if (existingStaff) {
    throw new AppError("Email already registered.", 409);
  }

  // Enrollment already exists
  const existingStudent = await Staff.findOne({
    enrollmentNumber,
  });

  if (existingStudent) {
    throw new AppError("Enrollment number already exists.", 409);
  }

  // Hostel must exist
  const hostel = await Hostel.findById(user.hostel);

  if (!hostel) {
    throw new AppError("Hostel not found.", 404);
  }

  // Hostel must be active
  if (!hostel.isActive) {
    throw new AppError("Hostel is inactive.", 400);
  }

  const student = await Staff.create({
    name,
    enrollmentNumber,
    email,
    password: enrollmentNumber,
    role: ROLES.STUDENT,
    hostel: user.hostel,
    isHeadWarden: false,
  });

  return student;
};

// ===============================
// 5. Create Worker
// ===============================

const createWorker = async (staffData, user) => {
  return createStaff(staffData, user, ROLES.WORKER);
};

// ===============================
// 6. Get Staff
// ===============================

const getStaff = async (user, role) => {
  let filter = {
    hostel: user.hostel,
  };

  // Head Warden
  if (user.role === ROLES.WARDEN && user.isHeadWarden) {
    if (role) {
      filter.role = role;
    }

    return Staff.find(filter).select("-password").sort({ createdAt: -1 });
  }

  // Normal Warden
  if (user.role === ROLES.WARDEN) {
    if (role === ROLES.WARDEN) {
      filter.role = ROLES.WARDEN;
    } else if (role === ROLES.WORKER) {
      filter.role = ROLES.WORKER;
    } else if (role === ROLES.STUDENT) {
      filter.role = ROLES.STUDENT;
    } else {
      return Staff.find({
        _id: user._id,
      }).select("-password");
    }

    return Staff.find(filter).select("-password").sort({ createdAt: -1 });
  }

  // Worker / Student
  return Staff.find({
    _id: user._id,
  }).select("-password");
};

// ===============================
// 7. Shared Staff Authorization
// ===============================

const findAuthorizedStaff = async (staffId, user) => {
  const staff = await Staff.findById(staffId);

  if (!staff) {
    throw new AppError("Staff member not found.", 404);
  }

  // Worker / Student → Only self
  if (
    [ROLES.WORKER, ROLES.STUDENT].includes(user.role) &&
    staff._id.toString() !== user._id.toString()
  ) {
    throw new AppError(
      "You are not authorized to access this staff member.",
      403,
    );
  }

  // Warden → Same hostel only
  if (
    user.role === ROLES.WARDEN &&
    staff.hostel?.toString() !== user.hostel.toString()
  ) {
    throw new AppError(
      "You are not authorized to access this staff member.",
      403,
    );
  }

  return staff;
};

// ===============================
// 8. Get Staff By ID
// ===============================

const getStaffById = async (staffId, user) => {
  return findAuthorizedStaff(staffId, user);
};

// ===============================
// 9. Update Staff
// ===============================

const updateStaff = async (staffId, updateData, user) => {
  const staff = await findAuthorizedStaff(staffId, user);

  if (staff._id.toString() === user._id.toString()) {
    throw new AppError(
      "Use the profile endpoint to update your own account.",
      400,
    );
  }

  // Normal Warden cannot update Wardens
  if (
    user.role === ROLES.WARDEN &&
    !user.isHeadWarden &&
    staff.role === ROLES.WARDEN
  ) {
    throw new AppError("You are not authorized to update wardens.", 403);
  }

  const { name, email, phone } = updateData;

  // Check duplicate email
  if (email && email !== staff.email) {
    const existingStaff = await Staff.findOne({ email });

    if (existingStaff) {
      throw new AppError("Email already registered.", 409);
    }

    staff.email = email;
  }

  if (name) {
    staff.name = name;
  }

  if (phone !== undefined) {
    staff.phone = phone;
  }

  await staff.save();

  return staff;
};

// ===============================
// 10. Deactivate Staff
// ===============================

const deactivateStaff = async (staffId, user) => {
  const staff = await findAuthorizedStaff(staffId, user);

  // Cannot deactivate yourself
  if (staff._id.toString() === user._id.toString()) {
    throw new AppError("You cannot deactivate your own account.", 400);
  }

  // Normal Warden cannot deactivate Wardens
  if (
    user.role === ROLES.WARDEN &&
    !user.isHeadWarden &&
    staff.role === ROLES.WARDEN
  ) {
    throw new AppError("You are not authorized to deactivate wardens.", 403);
  }

  staff.isActive = false;

  await staff.save();

  return staff;
};

// ===============================
// 11. Activate Staff
// ===============================

const activateStaff = async (staffId, user) => {
  const staff = await findAuthorizedStaff(staffId, user);

  // Normal Warden cannot activate Wardens
  if (
    user.role === ROLES.WARDEN &&
    !user.isHeadWarden &&
    staff.role === ROLES.WARDEN
  ) {
    throw new AppError("You are not authorized to activate wardens.", 403);
  }

  staff.isActive = true;

  await staff.save();

  return staff;
};

// ===============================
// 12. Make Head Warden
// ===============================

const makeHeadWarden = async (staffId, user) => {
  // Only Head Wardens
  if (!user.isHeadWarden) {
    throw new AppError("Only Head Wardens can transfer this role.", 403);
  }

  // Find selected warden
  const newHeadWarden = await findAuthorizedStaff(staffId, user);
  if (newHeadWarden._id.toString() === user._id.toString()) {
    throw new AppError("You are already the Head Warden.", 400);
  }

  // Must be Warden
  if (newHeadWarden.role !== ROLES.WARDEN) {
    throw new AppError("Selected staff member is not a warden.", 400);
  }

  // Already Head Warden
  if (newHeadWarden.isHeadWarden) {
    throw new AppError("This staff member is already the Head Warden.", 400);
  }

  // Must be active
  if (!newHeadWarden.isActive) {
    throw new AppError("Cannot promote an inactive warden.", 400);
  }

  // Find current Head Warden
  const currentHeadWarden = await Staff.findOne({
    hostel: user.hostel,
    role: ROLES.WARDEN,
    isHeadWarden: true,
  });

  if (!currentHeadWarden) {
    throw new AppError("Current Head Warden not found.", 404);
  }

  // Transfer Head Warden role
  currentHeadWarden.isHeadWarden = false;
  newHeadWarden.isHeadWarden = true;

  // NOTE:
  // In production (MongoDB Replica Set / Atlas),
  // replace these with a MongoDB transaction.
  await currentHeadWarden.save();
  await newHeadWarden.save();

  return newHeadWarden;
};

// ===============================
// 13. Export
// ===============================

export {
  createStaff,
  createWarden,
  createStudent,
  createWorker,
  getStaff,
  getStaffById,
  findAuthorizedStaff,
  updateStaff,
  activateStaff,
  deactivateStaff,
  makeHeadWarden,
};
