// ===============================
// 1. Imports
// ===============================

import express from "express";
import { getHealthController } from "../controllers/healthController.js";

// ===============================
// 2. Router
// ===============================

const router = express.Router();

// ===============================
// 3. Routes
// ===============================

router.get("/", getHealthController);

// ===============================
// 4. Export
// ===============================

export default router;
