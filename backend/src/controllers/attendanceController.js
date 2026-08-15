import asyncHandler from "../utils/asyncHandler.js";

import {
  getAttendance,
  getAttendanceById,
  markAttendance,
  updateAttendance,
  getStudentAttendance,
  getMyAttendance,
} from "../services/attendanceService.js";

const getAttendanceController = asyncHandler(async (req, res) => {
  const attendance = await getAttendance(req.user, req.query);

  res.status(200).json({
    success: true,
    count: attendance.length,
    data: attendance,
  });
});

const getAttendanceByIdController = asyncHandler(async (req, res) => {
  const attendance = await getAttendanceById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: attendance,
  });
});

const markAttendanceController = asyncHandler(async (req, res) => {
  const attendance = await markAttendance(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Attendance marked successfully.",
    data: attendance,
  });
});

const updateAttendanceController = asyncHandler(async (req, res) => {
  const attendance = await updateAttendance(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Attendance updated successfully.",
    data: attendance,
  });
});

const getStudentAttendanceController = asyncHandler(async (req, res) => {
  const attendance = await getStudentAttendance(
    req.params.studentId,
    req.user,
    req.query,
  );

  res.status(200).json({
    success: true,
    count: attendance.length,
    data: attendance,
  });
});

const getMyAttendanceController = asyncHandler(async (req, res) => {
  const attendance = await getMyAttendance(req.user, req.query);

  res.status(200).json({
    success: true,
    data: attendance,
  });
});

export {
  getAttendanceController,
  getAttendanceByIdController,
  markAttendanceController,
  updateAttendanceController,
  getStudentAttendanceController,
  getMyAttendanceController,
};
