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

// ===============================
// 2. Create Warden
// ===============================

const createWardenController = async (req, res) => {
  try {
    const warden = await createWarden(req.body, req.user);

    res.status(201).json({
      success: true,
      message: "Warden created successfully.",
      data: warden,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 3. Create Worker
// ===============================

const createWorkerController = async (req, res) => {
  try {
    const worker = await createWorker(req.body, req.user);

    res.status(201).json({
      success: true,
      message: "Worker created successfully.",
      data: worker,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 4. Create Student
// ===============================

const createStudentController = async (req, res) => {
  try {
    const student = await createStudent(req.body, req.user);

    res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 5. Get Wardens
// ===============================

const getWardens = async (req, res) => {
  try {
    const wardens = await getStaff(req.user, ROLES.WARDEN);

    res.status(200).json({
      success: true,
      count: wardens.length,
      data: wardens,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 6. Get Workers
// ===============================

const getWorkers = async (req, res) => {
  try {
    const workers = await getStaff(req.user, ROLES.WORKER);

    res.status(200).json({
      success: true,
      count: workers.length,
      data: workers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 7. Get Students
// ===============================

const getStudents = async (req, res) => {
  try {
    const students = await getStaff(req.user, ROLES.STUDENT);

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 8. Get Staff By ID
// ===============================

const getStaffByIdController = async (req, res) => {
  try {
    const staff = await getStaffById(req.params.id, req.user);

    res.status(200).json({
      success: true,
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
// 10. Update Staff
// ===============================

const updateStaffController = async (req, res) => {
  try {
    const staff = await updateStaff(req.params.id, req.body, req.user);

    res.status(200).json({
      success: true,
      message: "Staff updated successfully.",
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
// 11. Deactivate Staff
// ===============================

const deactivateStaffController = async (req, res) => {
  try {
    const staff = await deactivateStaff(req.params.id, req.user);

    res.status(200).json({
      success: true,
      message: "Staff deactivated successfully.",
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
// 12. Activate Staff
// ===============================

const activateStaffController = async (req, res) => {
  try {
    const staff = await activateStaff(req.params.id, req.user);

    res.status(200).json({
      success: true,
      message: "Staff activated successfully.",
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
// 13. Make Head Warden
// ===============================

const makeHeadWardenController = async (req, res) => {
  try {
    const warden = await makeHeadWarden(req.params.id, req.user);

    res.status(200).json({
      success: true,
      message: "Head Warden transferred successfully.",
      data: warden,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

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
