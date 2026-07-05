// ===============================
// 1. Imports
// ===============================

import { registerStaff, loginStaff } from "../services/authService.js";

// ===============================
// 2. Controller Functions
// ===============================

const register = async (req, res) => {
  try {
    const staff = await registerStaff(req.body);

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      data: staff,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 3. Login
// ===============================

const login = async (req, res) => {
  try {
    const result = await loginStaff(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 4. Export
// ===============================

export { register, login };
