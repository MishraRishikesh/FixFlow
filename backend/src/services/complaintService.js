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

  return complaint;
};

// ===============================
// 3. Get Complaints
// ===============================

const getComplaints = async user => {
  let complaints;

  // Student → Only own complaints
  if (user.role === ROLES.STUDENT) {
    complaints = await Complaint.find({
      createdBy: user._id,
    })
      .populate("createdBy", "name email")
      .populate("hostel", "name code")
      .populate("assignedWorker", "name")
      .sort({ createdAt: -1 });
  }

  // Warden → All complaints from hostel
  else if (user.role === ROLES.WARDEN) {
    complaints = await Complaint.find({
      hostel: user.hostel,
    })
      .populate("createdBy", "name email")
      .populate("hostel", "name code")
      .populate("assignedWorker", "name")
      .sort({ createdAt: -1 });
  }

  // Worker → Only assigned complaints
  else if (user.role === ROLES.WORKER) {
    complaints = await Complaint.find({
      assignedWorker: user._id,
    })
      .populate("createdBy", "name email")
      .populate("hostel", "name code")
      .populate("assignedWorker", "name")
      .sort({ createdAt: -1 });
  }

  // Super Admin → No access
  else {
    throw new AppError("You are not allowed to view complaints.", 403);
  }

  return complaints;
};
// ===============================
// 4. Get Complaint By ID
// ===============================

const getComplaintById = async (complaintId, user) => {
  const complaint = await Complaint.findById(complaintId)
    .populate("createdBy", "name email")
    .populate("hostel", "name code")
    .populate("assignedWorker", "name email")
    .populate("assignedBy", "name email");

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  // Student → Only own complaint
  if (
    user.role === ROLES.STUDENT &&
    complaint.createdBy._id.toString() !== user._id.toString()
  ) {
    throw new AppError("You are not allowed to view this complaint.", 403);
  }

  // Warden → Complaint must belong to same hostel
  if (
    user.role === ROLES.WARDEN &&
    complaint.hostel._id.toString() !== user.hostel.toString()
  ) {
    throw new AppError("You are not allowed to view this complaint.", 403);
  }

  // Worker → Only assigned complaint
  if (
    user.role === ROLES.WORKER &&
    (!complaint.assignedWorker ||
      complaint.assignedWorker._id.toString() !== user._id.toString())
  ) {
    throw new AppError("You are not allowed to view this complaint.", 403);
  }

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

  return complaint.populate([
    { path: "createdBy", select: "name email" },
    { path: "assignedWorker", select: "name email" },
    { path: "assignedBy", select: "name email" },
    { path: "hostel", select: "name code" },
  ]);
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

  complaint.status = status;

  await complaint.save();

  return complaint.populate([
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
  ]);
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
  complaint.title = title;
  complaint.description = description;
  complaint.category = category;
  complaint.priority = priority;

  await complaint.save();

  return complaint.populate([
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
  ]);
};

// ===============================
// 8. Delete Complaint
// ===============================

const deleteComplaint = async (complaintId, user) => {
  // Find Complaint
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  // Student → Only own pending complaints
  if (user.role === ROLES.STUDENT) {
    if (complaint.createdBy.toString() !== user._id.toString()) {
      throw new AppError("You are not allowed to delete this complaint.", 403);
    }

    if (complaint.status !== COMPLAINT_STATUS.PENDING) {
      throw new AppError("Only pending complaints can be deleted.", 400);
    }
  }

  // Warden → Complaint must belong to same hostel
  if (user.role === ROLES.WARDEN) {
    if (complaint.hostel.toString() !== user.hostel.toString()) {
      throw new AppError("You are not allowed to delete this complaint.", 403);
    }
  }

  await complaint.deleteOne();

  return;
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
