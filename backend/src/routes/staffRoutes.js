// ===============================
// 1. Imports
// ===============================

import express from "express";
import {
  createWorkerController,
  createStudentController,
  createWardenController,
  getStaffByIdController,
  updateStaffController,
  activateStaffController,
  deactivateStaffController,
  makeHeadWardenController,
  getWardens,
  getWorkers,
  getStudents,
} from "../controllers/staffController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorize, requireHeadWarden } from "../middleware/authorize.js";
import { ROLES } from "../constants/roles.js";

// ===============================
// 2. Router
// ===============================

const router = express.Router();

// ===============================
// 3. Routes
// ===============================

// Create Warden
router.post(
  "/wardens",
  verifyToken,
  authorize(ROLES.WARDEN),
  requireHeadWarden,
  createWardenController,
);

// Create Worker
router.post(
  "/workers",
  verifyToken,
  authorize(ROLES.WARDEN),
  createWorkerController,
);

// Create Student
router.post(
  "/students",
  verifyToken,
  authorize(ROLES.WARDEN),
  createStudentController,
);

// Get Wardens
router.get("/wardens", verifyToken, authorize(ROLES.WARDEN), getWardens);
router.get("/workers", verifyToken, authorize(ROLES.WARDEN), getWorkers);
router.get("/students", verifyToken, authorize(ROLES.WARDEN), getStudents);
router.get(
  "/:id",
  verifyToken,
  authorize(ROLES.WARDEN, ROLES.WORKER, ROLES.STUDENT),
  getStaffByIdController,
);

// Update Staff
router.patch(
  "/:id",
  verifyToken,
  authorize(ROLES.WARDEN),
  updateStaffController,
);

// Deactivate Staff
router.patch(
  "/:id/deactivate",
  verifyToken,
  authorize(ROLES.WARDEN),
  deactivateStaffController,
);

// Activate Staff
router.patch(
  "/:id/activate",
  verifyToken,
  authorize(ROLES.WARDEN),
  activateStaffController,
);

// Transfer Head Warden
router.patch(
  "/:id/make-head-warden",
  verifyToken,
  authorize(ROLES.WARDEN),
  requireHeadWarden,
  makeHeadWardenController,
);

// ===============================
// 4. Export
// ===============================

export default router;
