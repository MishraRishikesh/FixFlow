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

  const stats = {
    total: 0,
    pending: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
    rejected: 0,
  };

  data.forEach(item => {
    stats.total += item.count;

    switch (item._id) {
      case COMPLAINT_STATUS.PENDING:
        stats.pending = item.count;
        break;

      case COMPLAINT_STATUS.ASSIGNED:
        stats.assigned = item.count;
        break;

      case COMPLAINT_STATUS.IN_PROGRESS:
        stats.inProgress = item.count;
        break;

      case COMPLAINT_STATUS.COMPLETED:
        stats.completed = item.count;
        break;

      case COMPLAINT_STATUS.REJECTED:
        stats.rejected = item.count;
        break;

      default:
        break;
    }
  });

  return stats;
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
    status: status.map(item => ({
      name: item._id,
      count: item.count,
    })),

    category: category.map(item => ({
      name: item._id,
      count: item.count,
    })),

    priority: priority.map(item => ({
      name: item._id,
      count: item.count,
    })),
  };
};

const getRecentActivity = filter =>
  Complaint.find(filter)
    .populate("createdBy", "name")
    .populate("assignedWorker", "name")
    .sort({ updatedAt: -1 })
    .limit(8)
    .select("title status updatedAt createdAt createdBy assignedWorker");

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

  const [stats, recentComplaints, recentActivity] = await Promise.all([
    getStatusSummary(filter),
    getRecentComplaints(filter),
    getRecentActivity(filter),
  ]);

  stats.completionRate =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return {
    stats,
    charts: null,
    recentComplaints,
    recentActivity,
  };
};

// ===============================
// 4. Worker Dashboard
// ===============================

const getWorkerDashboard = async user => {
  const filter = {
    assignedWorker: user._id,
  };

  const [stats, recentComplaints, recentActivity] = await Promise.all([
    getStatusSummary(filter),
    getRecentComplaints(filter),
    getRecentActivity(filter),
  ]);

  stats.completionRate =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return {
    stats,
    charts: null,
    recentComplaints,
    recentActivity,
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

  const [stats, recentActivity, workers, students, charts, recentComplaints] =
    await Promise.all([
      getStatusSummary(complaintFilter),

      getRecentActivity(complaintFilter),

      Staff.countDocuments(workerFilter),

      Staff.countDocuments(studentFilter),

      getChartData(complaintFilter),

      getRecentComplaints(complaintFilter),
    ]);

  stats.workers = workers;
  stats.students = students;

  stats.completionRate =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return {
    stats,
    charts,
    recentComplaints,
    recentActivity,
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
