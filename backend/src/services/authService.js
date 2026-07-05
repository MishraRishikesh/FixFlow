// ===============================
// 1. Imports
// ===============================

import Staff from "../models/Staff.js";
import generateToken from "../utils/generateToken.js";

// ===============================
// 2. Service Functions
// ===============================

const registerStaff = async userData => {
  const { email } = userData;

  // Check if email already exists
  const existingUser = await Staff.findOne({ email });

  if (existingUser) {
    throw new Error("Email already registered.");
  }

  // Create new staff member
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
    throw new Error("Invalid email or password.");
  }

  // Compare password
  const isPasswordCorrect = await staff.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password.");
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
