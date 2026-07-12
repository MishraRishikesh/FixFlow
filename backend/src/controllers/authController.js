// ===============================
// 1. Imports
// ===============================

import { registerStaff, loginStaff } from "../services/authService.js";
import asyncHandler from "../utils/asyncHandler.js";

// ===============================
// 2. Controller Functions
// ===============================

const registerController = asyncHandler(async (req, res) => {
  const staff = await registerStaff(req.body);

  res.status(201).json({
    success: true,
    message: "Registration successful.",
    data: staff,
  });
});

// ===============================
// 3. Login
// ===============================

const loginController = asyncHandler(async (req, res) => {
  const result = await loginStaff(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful.",
    data: result,
  });
});

// ===============================
// 4. Export
// ===============================

export { registerController, loginController };
