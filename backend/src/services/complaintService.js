// ===============================
// 1. Imports
// ===============================

import Complaint from "../models/Complaint.js";
import Hostel from "../models/Hostel.js";
import Staff from "../models/Staff.js";
import { ROLES } from "../constants/roles.js";
import { COMPLAINT_STATUS } from "../constants/complaint.js";
import AppError from "../utils/appError.js";

// ===============================
// 2. Create Complaint
// ===============================

const createComplaint = async (complaintData, user) => {
  const { title, description, category, priority } = complaintData;

  // Check if user is allowed to create complaints
  if (![ROLES.STUDENT, ROLES.WARDEN].includes(user.role)) {
    throw new AppError("You are not allowed to create complaints.", 403);
  }

  // Check if hostel exists
  const hostel = await Hostel.findById(user.hostel);

  if (!hostel) {
    throw new AppError("Hostel not found.", 404);
  }

  // Check if hostel is active
  if (!hostel.isActive) {
    throw new AppError("This hostel is currently inactive.", 400);
  }

  // Create complaint
  const complaint = await Complaint.create({
    title,
    description,
    category,
    priority,
    createdBy: user._id,
    hostel: user.hostel,
  });

  return complaint.populate(complaintPopulate);
};

// ===============================
// 3. Get Complaints
// ===============================

const getComplaints = async (user, query = {}) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sort = "-createdAt",
    status,
    category,
    priority,
  } = query;

  const pageNumber = Number.isNaN(Number(page)) ? 1 : Math.max(Number(page), 1);

  const limitNumber = Number.isNaN(Number(limit))
    ? 10
    : Math.max(Number(limit), 1);

  const filter = {
    ...buildComplaintFilter(user, {
      status,
      category,
      priority,
    }),
    ...buildSearchFilter(search),
  };

  const allowedSorts = [
    "createdAt",
    "-createdAt",
    "priority",
    "-priority",
    "status",
    "-status",
  ];
  const sortBy = allowedSorts.includes(sort) ? sort : "-createdAt";

  const [complaints, total] = await Promise.all([
    Complaint.find(filter)
      .populate(complaintPopulate)
      .sort(sortBy)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber),

    Complaint.countDocuments(filter),
  ]);

  return {
    complaints,

    pagination: {
      total,

      page: pageNumber,

      limit: limitNumber,

      totalPages: Math.ceil(total / limitNumber),

      hasNextPage: pageNumber < Math.ceil(total / limitNumber),

      hasPrevPage: pageNumber > 1,
    },
  };
};

// ===============================
// 4. Get Complaint By ID
// ===============================

const getComplaintById = async (complaintId, user) => {
  const complaint =
    await Complaint.findById(complaintId).populate(complaintPopulate);

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  validateComplaintAccess(complaint, user);

  return complaint;
};

// ===============================
// 5. Assign Worker
// ===============================

const assignWorker = async (complaintId, workerId, user) => {
  // Find Complaint
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  // Complaint must belong to warden's hostel
  if (complaint.hostel.toString() !== user.hostel.toString()) {
    throw new AppError(
      "You are not allowed to assign workers for this hostel.",
      403,
    );
  }

  // Find Worker
  const worker = await Staff.findById(workerId);

  if (!worker) {
    throw new AppError("Worker not found.", 404);
  }

  // Worker role validation
  if (worker.role !== ROLES.WORKER) {
    throw new AppError("Selected staff member is not a worker.", 400);
  }

  // Worker must belong to same hostel
  if (worker.hostel.toString() !== user.hostel.toString()) {
    throw new AppError("Worker belongs to another hostel.", 400);
  }

  // Worker must be active
  if (!worker.isActive) {
    throw new AppError("Worker is inactive.", 400);
  }
  // Prevent Assigning same worker
  if (
    complaint.assignedWorker &&
    complaint.assignedWorker.toString() === worker._id.toString()
  ) {
    throw new AppError("Complaint is already assigned to this worker.", 400);
  }
  // Completed complaints cannot be reassigned
  if (complaint.status === COMPLAINT_STATUS.COMPLETED) {
    throw new AppError("Completed complaints cannot be reassigned.", 400);
  }

  // Assign Worker
  complaint.assignedWorker = worker._id;
  complaint.assignedBy = user._id;
  complaint.assignedAt = new Date();
  complaint.status = COMPLAINT_STATUS.ASSIGNED;

  await complaint.save();

  return complaint.populate(complaintPopulate);
};

// ===============================
// 6. Update Complaint Status
// ===============================

const updateComplaintStatus = async (complaintId, status, user) => {
  if (!Object.values(COMPLAINT_STATUS).includes(status)) {
    throw new AppError("Invalid complaint status.", 400);
  }
  // Find Complaint
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  // Only assigned worker can update status
  if (
    !complaint.assignedWorker ||
    complaint.assignedWorker.toString() !== user._id.toString()
  ) {
    throw new AppError("You are not assigned to this complaint.", 403);
  }

  // Allowed Status Transitions
  if (
    complaint.status === COMPLAINT_STATUS.ASSIGNED &&
    status !== COMPLAINT_STATUS.IN_PROGRESS
  ) {
    throw new AppError(
      "Assigned complaints can only be moved to In Progress.",
      400,
    );
  }

  if (
    complaint.status === COMPLAINT_STATUS.IN_PROGRESS &&
    status !== COMPLAINT_STATUS.COMPLETED
  ) {
    throw new AppError(
      "In Progress complaints can only be marked Completed.",
      400,
    );
  }

  if (complaint.status === COMPLAINT_STATUS.COMPLETED) {
    throw new AppError("Complaint is already completed.", 400);
  }

  if (complaint.status === status) {
    throw new AppError("Complaint is already in this status.", 400);
  }

  complaint.status = status;

  await complaint.save();

  return complaint.populate(complaintPopulate);
};

// ===============================
// 7. Update Complaint
// ===============================

const updateComplaint = async (complaintId, complaintData, user) => {
  const { title, description, category, priority } = complaintData;

  // Find Complaint
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  // Student → Only own complaints
  if (
    user.role === ROLES.STUDENT &&
    complaint.createdBy.toString() !== user._id.toString()
  ) {
    throw new AppError("You are not allowed to update this complaint.", 403);
  }

  // Warden → Complaint must belong to same hostel
  if (
    user.role === ROLES.WARDEN &&
    complaint.hostel.toString() !== user.hostel.toString()
  ) {
    throw new AppError("You are not allowed to update this complaint.", 403);
  }

  // Workers cannot edit complaints
  if (user.role === ROLES.WORKER) {
    throw new AppError("Workers are not allowed to update complaints.", 403);
  }

  // Don't allow editing after completion
  if (complaint.status === COMPLAINT_STATUS.COMPLETED) {
    throw new AppError("Completed complaints cannot be edited.", 400);
  }

  // Update editable fields
  if (title !== undefined) {
    complaint.title = title;
  }

  if (description !== undefined) {
    complaint.description = description;
  }

  if (category !== undefined) {
    complaint.category = category;
  }

  if (priority !== undefined) {
    complaint.priority = priority;
  }

  await complaint.save();

  return complaint.populate(complaintPopulate);
};

// ===============================
// 8. Delete Complaint
// ===============================

const deleteComplaint = async (complaintId, user) => {
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  if (user.role === ROLES.STUDENT) {
    validateComplaintAccess(complaint, user);

    if (complaint.status !== COMPLAINT_STATUS.PENDING) {
      throw new AppError("Only pending complaints can be deleted.", 400);
    }
  }

  if (user.role === ROLES.WARDEN) {
    validateComplaintAccess(complaint, user);
  }

  await complaint.deleteOne();
};

// ===============================
// Complaint Populate Options
// ===============================

const complaintPopulate = [
  {
    path: "createdBy",
    select: "name email",
  },
  {
    path: "assignedWorker",
    select: "name email",
  },
  {
    path: "assignedBy",
    select: "name email",
  },
  {
    path: "hostel",
    select: "name code",
  },
];

// ===============================
// Build Complaint Filter
// ===============================

const buildComplaintFilter = (user, query = {}) => {
  const filter = {};

  // Role Based Filter
  if (user.role === ROLES.STUDENT) {
    filter.createdBy = user._id;
  } else if (user.role === ROLES.WARDEN) {
    filter.hostel = user.hostel;
  } else if (user.role === ROLES.WORKER) {
    filter.assignedWorker = user._id;
  } else {
    throw new AppError("You are not allowed to view complaints.", 403);
  }

  // Status Filter
  if (query.status) {
    filter.status = query.status;
  }

  // Category Filter
  if (query.category) {
    filter.category = query.category;
  }

  // Priority Filter
  if (query.priority) {
    filter.priority = query.priority;
  }

  return filter;
};

// ===============================
// Build Search Filter
// ===============================

const buildSearchFilter = search => {
  if (!search) return {};

  return {
    $or: [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ],
  };
};

// ===============================
// Validate Complaint Access
// ===============================

const validateComplaintAccess = (complaint, user) => {
  switch (user.role) {
    case ROLES.STUDENT:
      if (complaint.createdBy.toString() !== user._id.toString()) {
        throw new AppError(
          "You are not allowed to access this complaint.",
          403,
        );
      }
      break;

    case ROLES.WARDEN:
      if (complaint.hostel.toString() !== user.hostel.toString()) {
        throw new AppError(
          "You are not allowed to access this complaint.",
          403,
        );
      }
      break;

    case ROLES.WORKER:
      if (
        !complaint.assignedWorker ||
        complaint.assignedWorker.toString() !== user._id.toString()
      ) {
        throw new AppError(
          "You are not allowed to access this complaint.",
          403,
        );
      }
      break;

    default:
      throw new AppError("Unauthorized.", 403);
  }
};

// ===============================
// 9. Export
// ===============================

export {
  createComplaint,
  getComplaints,
  getComplaintById,
  assignWorker,
  updateComplaintStatus,
  updateComplaint,
  deleteComplaint,
};
