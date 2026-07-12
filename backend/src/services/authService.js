// ===============================
// 1. Imports
// ===============================

import Staff from "../models/Staff.js";
import generateToken from "../utils/generateToken.js";
import { ROLES } from "../constants/roles.js";
import AppError from "../utils/appError.js";

// ===============================
// 2. Service Functions
// ===============================

const registerStaff = async userData => {
  const { email, role } = userData;

  // Only students can register publicly
  if (role !== ROLES.STUDENT) {
    throw new AppError(
      "Public registration is allowed only for students.",
      403,
    );
  }

  // Check if email already exists
  const existingUser = await Staff.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already registered.", 409);
  }

  // Create Staff
  const staff = await Staff.create(userData);

  return staff;
};

// ===============================
// 3. Login Staff
// ===============================

const loginStaff = async loginData => {
  const { email, password } = loginData;

  // Check if user exists
  const staff = await Staff.findOne({ email });

  if (!staff) {
    throw new AppError("Invalid email or password.", 401);
  }

  if (!staff.isActive) {
    throw new AppError("This account has been deactivated.", 403);
  }
  // Compare password
  const isPasswordCorrect = await staff.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password.", 401);
  }

  // Generate JWT
  const token = generateToken(staff);

  return {
    token,
    user: staff,
  };
};

// ===============================
// 4. Export
// ===============================
export { registerStaff, loginStaff };
