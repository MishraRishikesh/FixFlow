import express from "express";

import {
  getStaffController,
  createStaffController,
  getStaffByIdController,
  updateStaffController,
  deactivateStaffController,
  activateStaffController,
} from "../controllers/staffController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

// ===============================
// Staff Routes
// ===============================

// Get all workers
router.get("/", verifyToken, authorize(ROLES.WARDEN), getStaffController);

// Get worker by ID
router.get(
  "/:id",
  verifyToken,
  authorize(ROLES.WARDEN),
  getStaffByIdController,
);

// Create worker
router.post("/", verifyToken, authorize(ROLES.WARDEN), createStaffController);

// Update worker
router.put("/:id", verifyToken, authorize(ROLES.WARDEN), updateStaffController);

// Deactivate worker
router.patch(
  "/:id/deactivate",
  verifyToken,
  authorize(ROLES.WARDEN),
  deactivateStaffController,
);

// Activate worker
router.patch(
  "/:id/activate",
  verifyToken,
  authorize(ROLES.WARDEN),
  activateStaffController,
);

export default router;
