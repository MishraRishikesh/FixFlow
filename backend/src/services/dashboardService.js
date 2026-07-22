// ===============================
// 1. Imports
// ===============================

import Complaint from "../models/Complaint.js";
import Staff from "../models/Staff.js";

import { COMPLAINT_STATUS } from "../constants/complaint.js";

import { ROLES } from "../constants/roles.js";

// ===============================
// 2. Helpers
// ===============================

const getStatusSummary = async filter => {
  const data = await Complaint.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const summary = {
    total: 0,
    pending: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
    rejected: 0,
  };

  data.forEach(item => {
    summary.total += item.count;

    switch (item._id) {
      case COMPLAINT_STATUS.PENDING:
        summary.pending = item.count;
        break;

      case COMPLAINT_STATUS.ASSIGNED:
        summary.assigned = item.count;
        break;

      case COMPLAINT_STATUS.IN_PROGRESS:
        summary.inProgress = item.count;
        break;

      case COMPLAINT_STATUS.COMPLETED:
        summary.completed = item.count;
        break;

      case COMPLAINT_STATUS.REJECTED:
        summary.rejected = item.count;
        break;
    }
  });

  return summary;
};

const getChartData = async filter => {
  const [status, category, priority] = await Promise.all([
    Complaint.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]),

    Complaint.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]),

    Complaint.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  return {
    status,
    category,
    priority,
  };
};

const getRecentComplaints = filter =>
  Complaint.find(filter)
    .populate("createdBy", "name")
    .populate("assignedWorker", "name")
    .sort({ createdAt: -1 })
    .limit(5)
    .select(
      "title category priority status createdAt assignedWorker createdBy",
    );

// ===============================
// 3. Student Dashboard
// ===============================

const getStudentDashboard = async user => {
  const filter = {
    createdBy: user._id,
  };

  const [summary, recentComplaints] = await Promise.all([
    getStatusSummary(filter),
    getRecentComplaints(filter),
  ]);

  return {
    summary,
    charts: null,
    recentComplaints,
  };
};

// ===============================
// 4. Worker Dashboard
// ===============================

const getWorkerDashboard = async user => {
  const filter = {
    assignedWorker: user._id,
  };

  const [summary, recentComplaints] = await Promise.all([
    getStatusSummary(filter),
    getRecentComplaints(filter),
  ]);

  return {
    summary,
    charts: null,
    recentComplaints,
  };
};

// ===============================
// 5. Warden/Admin Dashboard
// ===============================

const getWardenDashboard = async user => {
  const complaintFilter = {};

  const workerFilter = {
    role: ROLES.WORKER,
    isActive: true,
  };

  const studentFilter = {
    role: ROLES.STUDENT,
    isActive: true,
  };

  if (user.role !== ROLES.ADMIN) {
    complaintFilter.hostel = user.hostel;
    workerFilter.hostel = user.hostel;
    studentFilter.hostel = user.hostel;
  }

  const [summary, workers, students, charts, recentComplaints] =
    await Promise.all([
      getStatusSummary(complaintFilter),

      Staff.countDocuments(workerFilter),

      Staff.countDocuments(studentFilter),

      getChartData(complaintFilter),

      getRecentComplaints(complaintFilter),
    ]);

  summary.workers = workers;
  summary.students = students;

  return {
    summary,
    charts,
    recentComplaints,
  };
};

// ===============================
// 6. Public Service
// ===============================

export const getDashboardSummary = async user => {
  switch (user.role) {
    case ROLES.STUDENT:
      return getStudentDashboard(user);

    case ROLES.WORKER:
      return getWorkerDashboard(user);

    case ROLES.WARDEN:
    case ROLES.ADMIN:
      return getWardenDashboard(user);

    default:
      throw new Error("Invalid role.");
  }
};
