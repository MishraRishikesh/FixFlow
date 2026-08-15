import Attendance from "../models/Attendance.js";
import Staff from "../models/Staff.js";
import { ROLES } from "../constants/roles.js";
import AppError from "../utils/appError.js";

const normalizeDate = date => {
  if (!date) {
    throw new AppError("Attendance date is required.", 400);
  }

  const normalizedDate = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(normalizedDate.getTime())) {
    throw new AppError("Invalid attendance date.", 400);
  }

  return normalizedDate;
};

// Get attendance records for a hostel/date
const getAttendance = async (user, filters = {}) => {
  const query = {
    hostel: user.hostel,
  };

  if (filters.date) {
    query.attendanceDate = normalizeDate(filters.date);
  }

  if (filters.studentId) {
    query.student = filters.studentId;
  }

  const attendance = await Attendance.find(query)
    .populate("student", "name enrollmentNumber email")
    .populate("markedBy", "name role")
    .sort({
      attendanceDate: -1,
      "student.name": 1,
    });

  return attendance;
};

// Get one attendance record
const getAttendanceById = async (attendanceId, user) => {
  const attendance = await Attendance.findOne({
    _id: attendanceId,
    hostel: user.hostel,
  })
    .populate("student", "name enrollmentNumber email")
    .populate("markedBy", "name role");

  if (!attendance) {
    throw new AppError("Attendance record not found.", 404);
  }

  return attendance;
};

// Mark attendance
const markAttendance = async (attendanceData, user) => {
  const { studentId, date, status } = attendanceData;

  if (!studentId) {
    throw new AppError("Student is required.", 400);
  }

  if (!["present", "absent", "on_leave"].includes(status)) {
    throw new AppError(
      "Attendance status must be present, absent, or on_leave.",
      400,
    );
  }

  const attendanceDate = normalizeDate(date);

  const student = await Staff.findOne({
    _id: studentId,
    hostel: user.hostel,
    role: ROLES.STUDENT,
  });

  if (!student) {
    throw new AppError("Student not found in your hostel.", 404);
  }

  const existingAttendance = await Attendance.findOne({
    student: studentId,
    attendanceDate,
  });

  if (existingAttendance) {
    throw new AppError(
      "Attendance has already been marked for this student on this date.",
      409,
    );
  }

  const attendance = await Attendance.create({
    student: studentId,
    hostel: user.hostel,
    attendanceDate,
    status,
    markedBy: user._id,
  });

  return Attendance.findById(attendance._id)
    .populate("student", "name enrollmentNumber email")
    .populate("markedBy", "name role");
};

// Update attendance
const updateAttendance = async (attendanceId, attendanceData, user) => {
  const attendance = await Attendance.findOne({
    _id: attendanceId,
    hostel: user.hostel,
  });

  if (!attendance) {
    throw new AppError("Attendance record not found.", 404);
  }

  if (!["present", "absent", "on_leave"].includes(attendanceData.status)) {
    throw new AppError(
      "Attendance status must be present, absent, or on_leave.",
      400,
    );
  }

  if (attendanceData.status) {
    attendance.status = attendanceData.status;
  }

  await attendance.save();

  return Attendance.findById(attendance._id)
    .populate("student", "name enrollmentNumber email")
    .populate("markedBy", "name role");
};

// Get attendance history for one student
const getStudentAttendance = async (studentId, user, filters = {}) => {
  const student = await Staff.findOne({
    _id: studentId,
    hostel: user.hostel,
    role: ROLES.STUDENT,
  });

  if (!student) {
    throw new AppError("Student not found in your hostel.", 404);
  }

  const query = {
    student: studentId,
    hostel: user.hostel,
  };

  if (filters.from || filters.to) {
    query.attendanceDate = {};

    if (filters.from) {
      query.attendanceDate.$gte = normalizeDate(filters.from);
    }

    if (filters.to) {
      query.attendanceDate.$lte = normalizeDate(filters.to);
    }
  }

  const attendance = await Attendance.find(query)
    .populate("student", "name enrollmentNumber")
    .populate("markedBy", "name role")
    .sort({ attendanceDate: -1 });

  return attendance;
};

// Get logged-in student's own attendance
const getMyAttendance = async (user, filters = {}) => {
  if (user.role !== ROLES.STUDENT) {
    throw new AppError("Only students can access their own attendance.", 403);
  }

  const query = {
    student: user._id,
    hostel: user.hostel,
  };

  if (filters.from || filters.to) {
    query.attendanceDate = {};

    if (filters.from) {
      query.attendanceDate.$gte = normalizeDate(filters.from);
    }

    if (filters.to) {
      query.attendanceDate.$lte = normalizeDate(filters.to);
    }
  }

  const attendance = await Attendance.find(query)
    .populate("student", "name enrollmentNumber")
    .sort({ attendanceDate: -1 });

  const present = attendance.filter(
    record => record.status === "present",
  ).length;

  const absent = attendance.filter(record => record.status === "absent").length;

  const onLeave = attendance.filter(
    record => record.status === "on_leave",
  ).length;

  const applicableDays = present + absent;

  const percentage =
    applicableDays === 0
      ? 0
      : Number(((present / applicableDays) * 100).toFixed(2));

  return {
    summary: {
      present,
      absent,
      onLeave,
      totalRecords: attendance.length,
      applicableDays,
      percentage,
    },
    attendance,
  };
};

export {
  getAttendance,
  getAttendanceById,
  markAttendance,
  updateAttendance,
  getStudentAttendance,
  getMyAttendance,
};
