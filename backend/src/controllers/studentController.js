import asyncHandler from "../utils/asyncHandler.js";

import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deactivateStudent,
  activateStudent,
} from "../services/studentService.js";

// ===============================
// 1. Get Students
// ===============================

const getStudentsController = asyncHandler(async (req, res) => {
  const students = await getStudents(req.user);

  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// ===============================
// 2. Get Student By ID
// ===============================

const getStudentByIdController = asyncHandler(async (req, res) => {
  const student = await getStudentById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: student,
  });
});

// ===============================
// 3. Create Student
// ===============================

const createStudentController = asyncHandler(async (req, res) => {
  const student = await createStudent(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Student created successfully.",
    data: student,
  });
});

// ===============================
// 4. Update Student
// ===============================

const updateStudentController = asyncHandler(async (req, res) => {
  const student = await updateStudent(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: student,
  });
});

// ===============================
// 5. Deactivate Student
// ===============================

const deactivateStudentController = asyncHandler(async (req, res) => {
  const student = await deactivateStudent(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Student deactivated successfully.",
    data: student,
  });
});

// ===============================
// 6. Activate Student
// ===============================

const activateStudentController = asyncHandler(async (req, res) => {
  const student = await activateStudent(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Student activated successfully.",
    data: student,
  });
});

// ===============================
// 7. Export
// ===============================

export {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deactivateStudentController,
  activateStudentController,
};
