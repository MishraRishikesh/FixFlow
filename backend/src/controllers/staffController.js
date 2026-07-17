// ===============================
// 1. Imports
// ===============================

import asyncHandler from "../utils/asyncHandler.js";

import {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../services/staffService.js";

// ===============================
// 2. Get Staff
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
// 3. Get Staff By ID
// ===============================

const getStaffByIdController = asyncHandler(async (req, res) => {
  const staff = await getStaffById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: staff,
  });
});

// ===============================
// 4. Create Staff
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
// 5. Update Staff
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
// 6. Delete Staff
// ===============================

const deleteStaffController = asyncHandler(async (req, res) => {
  await deleteStaff(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Worker deleted successfully.",
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
  deleteStaffController,
};
