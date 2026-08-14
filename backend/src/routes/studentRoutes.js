import express from "express";

import {
  getStudentsController,
  createStudentController,
  getStudentByIdController,
  updateStudentController,
  deactivateStudentController,
  activateStudentController,
} from "../controllers/studentController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// ===============================
// Student Routes
// ===============================

// Get all students
router.get("/", verifyToken, authorize(ROLES.WARDEN), getStudentsController);

// Get student by ID
router.get(
  "/:id",
  verifyToken,
  authorize(ROLES.WARDEN),
  getStudentByIdController,
);

// Create student
router.post("/", verifyToken, authorize(ROLES.WARDEN), createStudentController);

// Update student
router.put(
  "/:id",
  verifyToken,
  authorize(ROLES.WARDEN),
  updateStudentController,
);

// Deactivate student
router.patch(
  "/:id/deactivate",
  verifyToken,
  authorize(ROLES.WARDEN),
  deactivateStudentController,
);

// Activate student
router.patch(
  "/:id/activate",
  verifyToken,
  authorize(ROLES.WARDEN),
  activateStudentController,
);

export default router;
