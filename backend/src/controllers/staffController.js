// ===============================
// 1. Imports
// ===============================

import {
  createWarden,
  createWorker,
  createStudent,
  getStaff,
  getStaffById,
  updateStaff,
  activateStaff,
  deactivateStaff,
  makeHeadWarden,
} from "../services/staffService.js";
import { ROLES } from "../constants/roles.js";
import asyncHandler from "../utils/asyncHandler.js";

// ===============================
// 2. Create Warden
// ===============================

const createWardenController = asyncHandler(async (req, res) => {
  const warden = await createWarden(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Warden created successfully.",
    data: warden,
  });
});

// ===============================
// 3. Create Worker
// ===============================

const createWorkerController = asyncHandler(async (req, res) => {
  const worker = await createWorker(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Worker created successfully.",
    data: worker,
  });
});

// ===============================
// 4. Create Student
// ===============================

const createStudentController = asyncHandler(async (req, res) => {
  const student = await createStudent(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Student created successfully.",
    data: student,
  });
});

// ===============================
// 5. Get Wardens
// ===============================

const getWardens = asyncHandler(async (req, res) => {
  const wardens = await getStaff(req.user, ROLES.WARDEN);

  res.status(200).json({
    success: true,
    count: wardens.length,
    data: wardens,
  });
});

// ===============================
// 6. Get Workers
// ===============================

const getWorkers = asyncHandler(async (req, res) => {
  const workers = await getStaff(req.user, ROLES.WORKER);

  res.status(200).json({
    success: true,
    count: workers.length,
    data: workers,
  });
});

// ===============================
// 7. Get Students
// ===============================

const getStudents = asyncHandler(async (req, res) => {
  const students = await getStaff(req.user, ROLES.STUDENT);

  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// ===============================
// 8. Get Staff By ID
// ===============================

const getStaffByIdController = asyncHandler(async (req, res) => {
  const staff = await getStaffById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: staff,
  });
});

// ===============================
// 10. Update Staff
// ===============================

const updateStaffController = asyncHandler(async (req, res) => {
  const staff = await updateStaff(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Staff updated successfully.",
    data: staff,
  });
});

// ===============================
// 11. Deactivate Staff
// ===============================

const deactivateStaffController = asyncHandler(async (req, res) => {
  const staff = await deactivateStaff(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Staff deactivated successfully.",
    data: staff,
  });
});

// ===============================
// 12. Activate Staff
// ===============================

const activateStaffController = asyncHandler(async (req, res) => {
  const staff = await activateStaff(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Staff activated successfully.",
    data: staff,
  });
});

// ===============================
// 13. Make Head Warden
// ===============================

const makeHeadWardenController = asyncHandler(async (req, res) => {
  const warden = await makeHeadWarden(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Head Warden transferred successfully.",
    data: warden,
  });
});

// ===============================
// 14. Export
// ===============================

export {
  createWardenController,
  createWorkerController,
  createStudentController,
  getWardens,
  getWorkers,
  getStudents,
  getStaffByIdController,
  updateStaffController,
  deactivateStaffController,
  activateStaffController,
  makeHeadWardenController,
};
