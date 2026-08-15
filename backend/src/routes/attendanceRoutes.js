import express from "express";

import {
  getAttendanceController,
  getAttendanceByIdController,
  markAttendanceController,
  updateAttendanceController,
  getStudentAttendanceController,
  getMyAttendanceController,
} from "../controllers/attendanceController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.get("/", verifyToken, authorize(ROLES.WARDEN), getAttendanceController);

router.get(
  "/student/:studentId",
  verifyToken,
  authorize(ROLES.WARDEN),
  getStudentAttendanceController,
);

router.get(
  "/my",
  verifyToken,
  authorize(ROLES.STUDENT),
  getMyAttendanceController,
);

router.get(
  "/:id",
  verifyToken,
  authorize(ROLES.WARDEN),
  getAttendanceByIdController,
);

router.post(
  "/",
  verifyToken,
  authorize(ROLES.WARDEN),
  markAttendanceController,
);

router.put(
  "/:id",
  verifyToken,
  authorize(ROLES.WARDEN),
  updateAttendanceController,
);

export default router;
