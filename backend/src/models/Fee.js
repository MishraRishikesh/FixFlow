import mongoose from "mongoose";
import { ROLES } from "../constants/roles.js";

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },

    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "partial", "paid"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

feeSchema.index(
  {
    student: 1,
    hostel: 1,
  },
  {
    unique: true,
  },
);

feeSchema.pre("validate", async function () {
  if (!this.student) return;

  const Staff = mongoose.model("Staff");

  const student = await Staff.findOne({
    _id: this.student,
    role: ROLES.STUDENT,
  }).select("hostel");

  if (!student) {
    throw new Error("Fees can only be assigned to a student.");
  }

  if (!this.hostel) {
    this.hostel = student.hostel;
  }

  if (this.paidAmount > this.totalAmount) {
    throw new Error("Paid amount cannot exceed total fee.");
  }

  if (this.paidAmount === 0) {
    this.status = "pending";
  } else if (this.paidAmount < this.totalAmount) {
    this.status = "partial";
  } else {
    this.status = "paid";
  }
});

const Fee = mongoose.model("Fee", feeSchema);

export default Fee;
