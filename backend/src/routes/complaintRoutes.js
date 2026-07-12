// ===============================
// 1. Imports
// ===============================

import express from "express";

import {
  createComplaintController,
  getComplaintsController,
  getComplaintByIdController,
  assignWorkerController,
  updateComplaintStatusController,
} from "../controllers/complaintController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

import { ROLES } from "../constants/roles.js";

// ===============================
// 2. Router
// ===============================

const router = express.Router();

// ===============================
// 3. Routes
// ===============================

// Create Complaint
router.post(
  "/",
  verifyToken,
  authorize(ROLES.STUDENT, ROLES.WARDEN),
  createComplaintController,
);
// Get Complaints
router.get(
  "/",
  verifyToken,
  authorize(ROLES.STUDENT, ROLES.WARDEN, ROLES.WORKER),
  getComplaintsController,
);
// Get Complaint By ID
router.get(
  "/:id",
  verifyToken,
  authorize(ROLES.STUDENT, ROLES.WARDEN, ROLES.WORKER),
  getComplaintByIdController,
);
// Assign Worker (Warden Only)
router.patch(
  "/:id/assign",
  verifyToken,
  authorize(ROLES.WARDEN),
  assignWorkerController,
);
// Update Complaint Status (Worker Only)
router.patch(
  "/:id/status",
  verifyToken,
  authorize(ROLES.WORKER),
  updateComplaintStatusController,
);
// ===============================
// 4. Export
// ===============================

export default router;
