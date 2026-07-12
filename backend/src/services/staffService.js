// ===============================
// 1. Imports
// ===============================

import Staff from "../models/Staff.js";
import Hostel from "../models/Hostel.js";
import { ROLES } from "../constants/roles.js";

// ===============================
// 2. Shared Staff Creation
// ===============================

const createStaff = async (staffData, user, role) => {
  const { name, email, password } = staffData;

  // Email already exists
  const existingStaff = await Staff.findOne({ email });

  if (existingStaff) {
    throw new Error("Email already registered.");
  }

  // Hostel must exist
  const hostel = await Hostel.findById(user.hostel);

  if (!hostel) {
    throw new Error("Hostel not found.");
  }

  // Hostel must be active
  if (!hostel.isActive) {
    throw new Error("Hostel is inactive.");
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
    throw new Error("Enrollment number is required.");
  }

  // Email already exists
  const existingStaff = await Staff.findOne({ email });

  if (existingStaff) {
    throw new Error("Email already registered.");
  }

  // Enrollment already exists
  const existingStudent = await Staff.findOne({
    enrollmentNumber,
  });

  if (existingStudent) {
    throw new Error("Enrollment number already exists.");
  }

  // Hostel must exist
  const hostel = await Hostel.findById(user.hostel);

  if (!hostel) {
    throw new Error("Hostel not found.");
  }

  // Hostel must be active
  if (!hostel.isActive) {
    throw new Error("Hostel is inactive.");
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
    throw new Error("Staff member not found.");
  }

  // Worker / Student → Only self
  if (
    [ROLES.WORKER, ROLES.STUDENT].includes(user.role) &&
    staff._id.toString() !== user._id.toString()
  ) {
    throw new Error("You are not authorized to access this staff member.");
  }

  // Warden → Same hostel only
  if (
    user.role === ROLES.WARDEN &&
    staff.hostel?.toString() !== user.hostel.toString()
  ) {
    throw new Error("You are not authorized to access this staff member.");
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
    throw new Error("Use the profile endpoint to update your own account.");
  }

  // Normal Warden cannot update Wardens
  if (
    user.role === ROLES.WARDEN &&
    !user.isHeadWarden &&
    staff.role === ROLES.WARDEN
  ) {
    throw new Error("You are not authorized to update wardens.");
  }

  const { name, email, phone } = updateData;

  // Check duplicate email
  if (email && email !== staff.email) {
    const existingStaff = await Staff.findOne({ email });

    if (existingStaff) {
      throw new Error("Email already registered.");
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
    throw new Error("You cannot deactivate your own account.");
  }

  // Normal Warden cannot deactivate Wardens
  if (
    user.role === ROLES.WARDEN &&
    !user.isHeadWarden &&
    staff.role === ROLES.WARDEN
  ) {
    throw new Error("You are not authorized to deactivate wardens.");
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
    throw new Error("You are not authorized to activate wardens.");
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
    throw new Error("Only Head Wardens can transfer this role.");
  }

  // Find selected warden
  const newHeadWarden = await findAuthorizedStaff(staffId, user);
  if (newHeadWarden._id.toString() === user._id.toString()) {
    throw new Error("You are already the Head Warden.");
  }

  // Must be Warden
  if (newHeadWarden.role !== ROLES.WARDEN) {
    throw new Error("Selected staff member is not a warden.");
  }

  // Already Head Warden
  if (newHeadWarden.isHeadWarden) {
    throw new Error("This staff member is already the Head Warden.");
  }

  // Must be active
  if (!newHeadWarden.isActive) {
    throw new Error("Cannot promote an inactive warden.");
  }

  // Find current Head Warden
  const currentHeadWarden = await Staff.findOne({
    hostel: user.hostel,
    role: ROLES.WARDEN,
    isHeadWarden: true,
  });

  if (!currentHeadWarden) {
    throw new Error("Current Head Warden not found.");
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
