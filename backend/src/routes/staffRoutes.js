// ===============================
// 1. Imports
// ===============================

import express from "express";

import {
  getStaffController,
  createStaffController,
  getStaffByIdController,
  updateStaffController,
  deleteStaffController,
} from "../controllers/staffController.js";

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

// Get All Staff
router.get("/", verifyToken, authorize(ROLES.WARDEN), getStaffController);

// Get Staff By ID
router.get(
  "/:id",
  verifyToken,
  authorize(ROLES.WARDEN),
  getStaffByIdController,
);

// Create Staff
router.post("/", verifyToken, authorize(ROLES.WARDEN), createStaffController);

// Update Staff
router.put("/:id", verifyToken, authorize(ROLES.WARDEN), updateStaffController);

// Delete Staff
router.delete(
  "/:id",
  verifyToken,
  authorize(ROLES.WARDEN),
  deleteStaffController,
);

// ===============================
// 4. Export
// ===============================

export default router;
