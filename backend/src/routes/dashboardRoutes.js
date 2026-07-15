// ===============================
// 1. Imports
// ===============================

import express from "express";

import { getDashboardSummaryController } from "../controllers/dashboardController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

// ===============================
// 2. Router
// ===============================

const router = express.Router();

// ===============================
// 3. Routes
// ===============================

router.get("/", verifyToken, getDashboardSummaryController);

// ===============================
// 4. Export
// ===============================

export default router;
