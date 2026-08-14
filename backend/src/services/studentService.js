import Staff from "../models/Staff.js";
import { ROLES } from "../constants/roles.js";
import AppError from "../utils/appError.js";

// ===============================
// 1. Get Students
// ===============================

const getStudents = async user => {
  return Staff.find({
    hostel: user.hostel,
    role: ROLES.STUDENT,
  })
    .select("-password")
    .sort({ isActive: -1, createdAt: -1 });
};

// ===============================
// 2. Get Student By ID
// ===============================

const getStudentById = async (studentId, user) => {
  const student = await Staff.findOne({
    _id: studentId,
    hostel: user.hostel,
    role: ROLES.STUDENT,
  }).select("-password");

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  return student;
};

// ===============================
// 3. Create Student
// ===============================

const createStudent = async (studentData, user) => {
  const { name, enrollmentNumber, email, password, phone } = studentData;

  const normalizedEmail = email?.trim().toLowerCase();

  if (!name?.trim()) {
    throw new AppError("Student name is required.", 400);
  }

  if (!enrollmentNumber?.trim()) {
    throw new AppError("Enrollment number is required.", 400);
  }

  if (!normalizedEmail) {
    throw new AppError("Email is required.", 400);
  }

  if (!password) {
    throw new AppError("Password is required.", 400);
  }

  const existingEmail = await Staff.findOne({
    email: normalizedEmail,
  });

  if (existingEmail) {
    if (existingEmail.role === ROLES.STUDENT && !existingEmail.isActive) {
      throw new AppError(
        "A student with this email already exists but is inactive. Activate the existing student instead.",
        409,
      );
    }

    throw new AppError("Email already registered.", 409);
  }

  const existingEnrollment = await Staff.findOne({
    enrollmentNumber: enrollmentNumber.trim(),
    hostel: user.hostel,
    role: ROLES.STUDENT,
  });

  if (existingEnrollment) {
    throw new AppError(
      "Enrollment number is already registered in this hostel.",
      409,
    );
  }

  const student = await Staff.create({
    name: name.trim(),
    enrollmentNumber: enrollmentNumber.trim(),
    email: normalizedEmail,
    password,
    phone: phone?.trim() || "",
    role: ROLES.STUDENT,
    hostel: user.hostel,
    isHeadWarden: false,
  });

  return student;
};

// ===============================
// 4. Update Student
// ===============================

const updateStudent = async (studentId, studentData, user) => {
  const student = await Staff.findOne({
    _id: studentId,
    hostel: user.hostel,
    role: ROLES.STUDENT,
  });

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  const { name, enrollmentNumber, email, phone } = studentData;

  if (email !== undefined) {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== student.email) {
      const existingStudent = await Staff.findOne({
        email: normalizedEmail,
        _id: { $ne: studentId },
      });

      if (existingStudent) {
        throw new AppError("Email already registered.", 409);
      }

      student.email = normalizedEmail;
    }
  }

  if (enrollmentNumber !== undefined) {
    const normalizedEnrollment = enrollmentNumber.trim();

    if (normalizedEnrollment !== student.enrollmentNumber) {
      const existingStudent = await Staff.findOne({
        enrollmentNumber: normalizedEnrollment,
        hostel: user.hostel,
        role: ROLES.STUDENT,
        _id: { $ne: studentId },
      });

      if (existingStudent) {
        throw new AppError(
          "Enrollment number is already registered in this hostel.",
          409,
        );
      }

      student.enrollmentNumber = normalizedEnrollment;
    }
  }

  if (name !== undefined) {
    student.name = name.trim();
  }

  if (phone !== undefined) {
    student.phone = phone.trim();
  }

  await student.save();

  return student;
};

// ===============================
// 5. Deactivate Student
// ===============================

const deactivateStudent = async (studentId, user) => {
  const student = await Staff.findOne({
    _id: studentId,
    hostel: user.hostel,
    role: ROLES.STUDENT,
  });

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  if (!student.isActive) {
    throw new AppError("Student is already inactive.", 400);
  }

  student.isActive = false;

  await student.save();

  return student;
};

// ===============================
// 6. Activate Student
// ===============================

const activateStudent = async (studentId, user) => {
  const student = await Staff.findOne({
    _id: studentId,
    hostel: user.hostel,
    role: ROLES.STUDENT,
  });

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  if (student.isActive) {
    throw new AppError("Student is already active.", 400);
  }

  student.isActive = true;

  await student.save();

  return student;
};

// ===============================
// 7. Export
// ===============================

export {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deactivateStudent,
  activateStudent,
};
