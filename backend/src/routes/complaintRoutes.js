// ===============================
// 1. Imports
// ===============================

import express from "express";

import {
  create,
  getAll,
  getById,
  assign,
  updateStatus,
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
router.post("/", verifyToken, authorize(ROLES.STUDENT, ROLES.WARDEN), create);
// Get Complaints
router.get(
  "/",
  verifyToken,
  authorize(ROLES.STUDENT, ROLES.WARDEN, ROLES.WORKER),
  getAll,
);
// Get Complaint By ID
router.get(
  "/:id",
  verifyToken,
  authorize(ROLES.STUDENT, ROLES.WARDEN, ROLES.WORKER),
  getById,
);
// Assign Worker (Warden Only)
router.patch("/:id/assign", verifyToken, authorize(ROLES.WARDEN), assign);
// Update Complaint Status (Worker Only)
router.patch("/:id/status", verifyToken, authorize(ROLES.WORKER), updateStatus);
// ===============================
// 4. Export
// ===============================

export default router;
