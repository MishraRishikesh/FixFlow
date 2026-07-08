// ===============================
// 1. Imports
// ===============================

import express from "express";

import {
  create,
  getAll,
  getById,
  update,
  updateStatus,
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
router.post("/", verifyToken, authorize("admin"), create);

// Get All Hostels (Admin + Warden)
router.get("/", verifyToken, authorize("admin", "warden"), getAll);

// Get Hostel By ID (Admin + Warden)
router.get("/:id", verifyToken, authorize("admin", "warden"), getById);

// Update Hostel (Admin Only)
router.put("/:id", verifyToken, authorize("admin"), update);

// Deactivate Hostel (Admin Only)
router.patch("/:id/status", verifyToken, authorize("admin"), updateStatus);
// ===============================
// 4. Export
// ===============================

export default router;
