import asyncHandler from "../utils/asyncHandler.js";

import {
  getFees,
  getFeeById,
  getMyFee,
  setStudentFee,
  setFeeForAllStudents,
  recordPayment,
  getPaymentHistory,
} from "../services/feeService.js";

const getFeesController = asyncHandler(async (req, res) => {
  const fees = await getFees(req.user, req.query);

  res.status(200).json({
    success: true,
    count: fees.length,
    data: fees,
  });
});

const getFeeByIdController = asyncHandler(async (req, res) => {
  const fee = await getFeeById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: fee,
  });
});

const getMyFeeController = asyncHandler(async (req, res) => {
  const result = await getMyFee(req.user);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const setStudentFeeController = asyncHandler(async (req, res) => {
  const fee = await setStudentFee(req.params.studentId, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Student fee saved successfully.",
    data: fee,
  });
});

const setFeeForAllStudentsController = asyncHandler(async (req, res) => {
  const result = await setFeeForAllStudents(req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Fee applied to all active students.",
    data: result,
  });
});

const recordPaymentController = asyncHandler(async (req, res) => {
  const result = await recordPayment(req.params.id, req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Payment recorded successfully.",
    data: result,
  });
});

const getPaymentHistoryController = asyncHandler(async (req, res) => {
  const payments = await getPaymentHistory(req.params.id, req.user);

  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments,
  });
});

export {
  getFeesController,
  getFeeByIdController,
  getMyFeeController,
  setStudentFeeController,
  setFeeForAllStudentsController,
  recordPaymentController,
  getPaymentHistoryController,
};
