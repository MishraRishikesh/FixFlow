import express from "express";

import {
  getFeesController,
  getFeeByIdController,
  getMyFeeController,
  setStudentFeeController,
  setFeeForAllStudentsController,
  recordPaymentController,
  getPaymentHistoryController,
} from "../controllers/feeController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/*
 * Student: view own fees
 *
 * IMPORTANT:
 * Keep /my before /:id.
 */
router.get("/my", verifyToken, authorize(ROLES.STUDENT), getMyFeeController);

/*
 * Warden: view all fee records
 * in their hostel.
 */
router.get("/", verifyToken, authorize(ROLES.WARDEN), getFeesController);

/*
 * Warden: apply the same fee
 * to all active students.
 *
 * IMPORTANT:
 * Keep /all before /:id.
 */
router.put(
  "/all",
  verifyToken,
  authorize(ROLES.WARDEN),
  setFeeForAllStudentsController,
);

/*
 * Warden: set/update fee
 * for one student.
 */
router.put(
  "/student/:studentId",
  verifyToken,
  authorize(ROLES.WARDEN),
  setStudentFeeController,
);

/*
 * Warden: record a payment.
 */
router.post(
  "/:id/payment",
  verifyToken,
  authorize(ROLES.WARDEN),
  recordPaymentController,
);

/*
 * Warden: view payment history.
 */
router.get(
  "/:id/payments",
  verifyToken,
  authorize(ROLES.WARDEN),
  getPaymentHistoryController,
);

/*
 * Warden: view one fee record.
 */
router.get("/:id", verifyToken, authorize(ROLES.WARDEN), getFeeByIdController);

export default router;
