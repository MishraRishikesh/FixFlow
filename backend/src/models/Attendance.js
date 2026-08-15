import mongoose from "mongoose";
import { ROLES } from "../constants/roles.js";

const attendanceSchema = new mongoose.Schema(
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

    attendanceDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["present", "absent", "on_leave"],
      required: true,
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

attendanceSchema.index(
  {
    student: 1,
    attendanceDate: 1,
  },
  {
    unique: true,
  },
);

attendanceSchema.pre("validate", async function () {
  if (!this.student) return;

  const Student = mongoose.model("Staff");

  const student = await Student.findOne({
    _id: this.student,
    role: ROLES.STUDENT,
  }).select("hostel");

  if (!student) {
    throw new Error("Attendance can only be marked for a student.");
  }

  if (!this.hostel) {
    this.hostel = student.hostel;
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
