import asyncHandler from "../utils/asyncHandler.js";

import {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deactivateStaff,
  activateStaff,
} from "../services/staffService.js";

// ===============================
// 1. Get Staff
// ===============================

const getStaffController = asyncHandler(async (req, res) => {
  const staff = await getStaff(req.user);

  res.status(200).json({
    success: true,
    count: staff.length,
    data: staff,
  });
});

// ===============================
// 2. Get Staff By ID
// ===============================

const getStaffByIdController = asyncHandler(async (req, res) => {
  const staff = await getStaffById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: staff,
  });
});

// ===============================
// 3. Create Staff
// ===============================

const createStaffController = asyncHandler(async (req, res) => {
  const staff = await createStaff(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Worker created successfully.",
    data: staff,
  });
});

// ===============================
// 4. Update Staff
// ===============================

const updateStaffController = asyncHandler(async (req, res) => {
  const staff = await updateStaff(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Worker updated successfully.",
    data: staff,
  });
});

// ===============================
// 5. Deactivate Staff
// ===============================

const deactivateStaffController = asyncHandler(async (req, res) => {
  const staff = await deactivateStaff(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Worker deactivated successfully.",
    data: staff,
  });
});

// ===============================
// 6. Activate Staff
// ===============================

const activateStaffController = asyncHandler(async (req, res) => {
  const staff = await activateStaff(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Worker activated successfully.",
    data: staff,
  });
});

// ===============================
// 7. Export
// ===============================

export {
  getStaffController,
  getStaffByIdController,
  createStaffController,
  updateStaffController,
  deactivateStaffController,
  activateStaffController,
};
