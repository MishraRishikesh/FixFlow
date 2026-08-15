import Fee from "../models/Fee.js";
import Payment from "../models/Payment.js";
import Staff from "../models/Staff.js";
import { ROLES } from "../constants/roles.js";
import AppError from "../utils/appError.js";

const getStudentInHostel = async (studentId, hostelId) => {
  const student = await Staff.findOne({
    _id: studentId,
    hostel: hostelId,
    role: ROLES.STUDENT,
  });

  if (!student) {
    throw new AppError("Student not found in your hostel.", 404);
  }

  return student;
};

const normalizeDate = date => {
  if (!date) {
    throw new AppError("Due date is required.", 400);
  }

  const normalizedDate = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(normalizedDate.getTime())) {
    throw new AppError("Invalid due date.", 400);
  }

  return normalizedDate;
};

const validateAmount = amount => {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount) || numericAmount < 0) {
    throw new AppError("Fee amount must be a valid non-negative number.", 400);
  }

  return numericAmount;
};

/*
 * Get all fee records for the current user's hostel.
 */
const getFees = async (user, filters = {}) => {
  const query = {
    hostel: user.hostel,
  };

  if (filters.studentId) {
    query.student = filters.studentId;
  }

  if (filters.status) {
    if (!["pending", "partial", "paid"].includes(filters.status)) {
      throw new AppError("Invalid fee status.", 400);
    }

    query.status = filters.status;
  }

  const fees = await Fee.find(query)
    .populate("student", "name enrollmentNumber email phone isActive")
    .populate("createdBy", "name role")
    .sort({
      dueDate: 1,
      "student.name": 1,
    });

  return fees;
};

/*
 * Get one fee record.
 */
const getFeeById = async (feeId, user) => {
  const fee = await Fee.findOne({
    _id: feeId,
    hostel: user.hostel,
  })
    .populate("student", "name enrollmentNumber email phone isActive")
    .populate("createdBy", "name role");

  if (!fee) {
    throw new AppError("Fee record not found.", 404);
  }

  return fee;
};

/*
 * Get the current student's own fee.
 */
const getMyFee = async user => {
  if (user.role !== ROLES.STUDENT) {
    throw new AppError("Only students can access their own fees.", 403);
  }

  const fee = await Fee.findOne({
    student: user._id,
    hostel: user.hostel,
  }).populate("student", "name enrollmentNumber email");

  if (!fee) {
    return {
      fee: null,
      payments: [],
    };
  }

  const payments = await Payment.find({
    fee: fee._id,
  })
    .populate("recordedBy", "name role")
    .sort({
      paymentDate: -1,
      createdAt: -1,
    });

  return {
    fee,
    payments,
  };
};

/*
 * Create or update the fee for one student.
 */
const setStudentFee = async (studentId, feeData, user) => {
  const student = await getStudentInHostel(studentId, user.hostel);

  const totalAmount = validateAmount(feeData.totalAmount);

  const dueDate = normalizeDate(feeData.dueDate);

  let fee = await Fee.findOne({
    student: student._id,
    hostel: user.hostel,
  });

  if (fee) {
    if (totalAmount < fee.paidAmount) {
      throw new AppError(
        "Total fee cannot be less than the amount already paid.",
        400,
      );
    }

    fee.totalAmount = totalAmount;
    fee.dueDate = dueDate;
    fee.createdBy = user._id;

    await fee.save();
  } else {
    fee = await Fee.create({
      student: student._id,
      hostel: user.hostel,
      totalAmount,
      paidAmount: 0,
      dueDate,
      createdBy: user._id,
    });
  }

  return Fee.findById(fee._id)
    .populate("student", "name enrollmentNumber email phone isActive")
    .populate("createdBy", "name role");
};

/*
 * Apply the same fee to every active student
 * in the current user's hostel.
 */
const setFeeForAllStudents = async (feeData, user) => {
  const totalAmount = validateAmount(feeData.totalAmount);

  const dueDate = normalizeDate(feeData.dueDate);

  const students = await Staff.find({
    hostel: user.hostel,
    role: ROLES.STUDENT,
    isActive: true,
  }).select("_id");

  if (students.length === 0) {
    throw new AppError("No active students found in your hostel.", 404);
  }

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const student of students) {
    const existingFee = await Fee.findOne({
      student: student._id,
      hostel: user.hostel,
    });

    if (existingFee) {
      /*
       * Never reduce a fee below the amount already paid.
       */
      if (totalAmount < existingFee.paidAmount) {
        skippedCount += 1;
        continue;
      }

      existingFee.totalAmount = totalAmount;
      existingFee.dueDate = dueDate;
      existingFee.createdBy = user._id;

      await existingFee.save();

      updatedCount += 1;
    } else {
      await Fee.create({
        student: student._id,
        hostel: user.hostel,
        totalAmount,
        paidAmount: 0,
        dueDate,
        createdBy: user._id,
      });

      createdCount += 1;
    }
  }

  return {
    totalStudents: students.length,
    created: createdCount,
    updated: updatedCount,
    skipped: skippedCount,
  };
};

/*
 * Record a payment against a student's fee.
 */
const recordPayment = async (feeId, paymentData, user) => {
  const fee = await Fee.findOne({
    _id: feeId,
    hostel: user.hostel,
  });

  if (!fee) {
    throw new AppError("Fee record not found.", 404);
  }

  const amount = Number(paymentData.amount);

  if (Number.isNaN(amount) || amount <= 0) {
    throw new AppError("Payment amount must be greater than zero.", 400);
  }

  const remainingAmount = fee.totalAmount - fee.paidAmount;

  if (amount > remainingAmount) {
    throw new AppError(
      `Payment cannot exceed the remaining fee of ${remainingAmount}.`,
      400,
    );
  }

  const paymentDate = paymentData.paymentDate
    ? new Date(`${paymentData.paymentDate}T00:00:00.000Z`)
    : new Date();

  if (Number.isNaN(paymentDate.getTime())) {
    throw new AppError("Invalid payment date.", 400);
  }

  const payment = await Payment.create({
    fee: fee._id,
    amount,
    paymentDate,
    recordedBy: user._id,
    note: paymentData.note || "",
  });

  fee.paidAmount += amount;

  await fee.save();

  const updatedFee = await Fee.findById(fee._id)
    .populate("student", "name enrollmentNumber email phone isActive")
    .populate("createdBy", "name role");

  const payments = await Payment.find({
    fee: fee._id,
  })
    .populate("recordedBy", "name role")
    .sort({
      paymentDate: -1,
      createdAt: -1,
    });

  return {
    fee: updatedFee,
    payment,
    payments,
  };
};

/*
 * Get payment history for one fee.
 */
const getPaymentHistory = async (feeId, user) => {
  const fee = await Fee.findOne({
    _id: feeId,
    hostel: user.hostel,
  });

  if (!fee) {
    throw new AppError("Fee record not found.", 404);
  }

  return Payment.find({
    fee: fee._id,
  })
    .populate("recordedBy", "name role")
    .sort({
      paymentDate: -1,
      createdAt: -1,
    });
};

export {
  getFees,
  getFeeById,
  getMyFee,
  setStudentFee,
  setFeeForAllStudents,
  recordPayment,
  getPaymentHistory,
};
