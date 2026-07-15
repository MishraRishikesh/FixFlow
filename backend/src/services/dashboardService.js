// ===============================
// 1. Imports
// ===============================

import Complaint from "../models/Complaint.js";
import Staff from "../models/Staff.js";
import { COMPLAINT_STATUS } from "../constants/complaint.js";
import { ROLES } from "../constants/roles.js";

// ===============================
// 2. Dashboard Summary
// ===============================

export const getDashboardSummary = async user => {
  const complaintFilter = {};
  const workerFilter = {
    role: ROLES.WORKER,
    isActive: true,
  };

  if (user.role !== ROLES.ADMIN) {
    complaintFilter.hostel = user.hostel;
    workerFilter.hostel = user.hostel;
  }
  const [
    pendingComplaints,
    activeComplaints,
    resolvedComplaints,
    workers,
    recentComplaints,
  ] = await Promise.all([
    Complaint.countDocuments({
      status: COMPLAINT_STATUS.PENDING,
      ...complaintFilter,
    }),

    Complaint.countDocuments({
      status: COMPLAINT_STATUS.IN_PROGRESS,
      ...complaintFilter,
    }),

    Complaint.countDocuments({
      status: COMPLAINT_STATUS.RESOLVED,
      ...complaintFilter,
    }),

    Staff.countDocuments(workerFilter),

    Complaint.find(complaintFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status category createdAt"),
  ]);

  return {
    stats: {
      pendingComplaints,
      activeComplaints,
      resolvedComplaints,
      workers,
    },

    recentComplaints,
  };
};
