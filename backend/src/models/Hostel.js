// ===============================
// 1. Imports
// ===============================

import mongoose from "mongoose";

// ===============================
// 2. Create Schema
// ===============================

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
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

// ===============================
// 3. Model
// ===============================

const Hostel = mongoose.model("Hostel", hostelSchema);

// ===============================
// 4. Export
// ===============================

export default Hostel;
