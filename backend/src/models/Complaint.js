// ===============================
// 1. Imports
// ===============================

import mongoose from "mongoose";

import {
  COMPLAINT_STATUS,
  COMPLAINT_STATUS_VALUES,
  COMPLAINT_PRIORITY,
  COMPLAINT_PRIORITY_VALUES,
  COMPLAINT_CATEGORY_VALUES,
} from "../constants/complaint.js";

// ===============================
// 2. Create Schema
// ===============================

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: COMPLAINT_CATEGORY_VALUES,
      required: true,
    },

    priority: {
      type: String,
      enum: COMPLAINT_PRIORITY_VALUES,
      default: COMPLAINT_PRIORITY.MEDIUM,
    },

    status: {
      type: String,
      enum: COMPLAINT_STATUS_VALUES,
      default: COMPLAINT_STATUS.PENDING,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },

    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },

    assignedWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },

    assignedAt: {
      type: Date,
      default: null,
    },

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// ===============================
// 3. Model
// ===============================

const Complaint = mongoose.model("Complaint", complaintSchema);

// ===============================
// 4. Export
// ===============================

export default Complaint;
