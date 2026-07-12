// ===============================
// 1. Imports
// ===============================

import express from "express";

import {
  createHostelController,
  getAllHostelsController,
  getHostelByIdController,
  updateHostelController,
  updateHostelStatusController,
} from "../controllers/hostelController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

// ===============================
// 2. Router
// ===============================

const router = express.Router();

// ===============================
// 3. Routes
// ===============================

// Create Hostel (Admin Only)
router.post("/", verifyToken, authorize("admin"), createHostelController);

// Get All Hostels (Admin + Warden)
router.get(
  "/",
  verifyToken,
  authorize("admin", "warden"),
  getAllHostelsController,
);

// Get Hostel By ID (Admin + Warden)
router.get(
  "/:id",
  verifyToken,
  authorize("admin", "warden"),
  getHostelByIdController,
);

// Update Hostel (Admin Only)
router.put("/:id", verifyToken, authorize("admin"), updateHostelController);

// Deactivate Hostel (Admin Only)
router.patch(
  "/:id/status",
  verifyToken,
  authorize("admin"),
  updateHostelStatusController,
);
// ===============================
// 4. Export
// ===============================

export default router;
