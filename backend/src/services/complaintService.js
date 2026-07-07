// ===============================
// 1. Imports
// ===============================

import Complaint from "../models/Complaint.js";
import Hostel from "../models/Hostel.js";
import Staff from "../models/Staff.js";
import { ROLES } from "../constants/roles.js";
import { COMPLAINT_STATUS } from "../constants/complaint.js";

// ===============================
// 2. Create Complaint
// ===============================

const createComplaint = async (complaintData, user) => {
  const { title, description, category, priority } = complaintData;

  // Check if user is allowed to create complaints
  if (![ROLES.STUDENT, ROLES.WARDEN].includes(user.role)) {
    throw new Error("You are not allowed to create complaints.");
  }

  // Check if hostel exists
  const hostel = await Hostel.findById(user.hostel);

  if (!hostel) {
    throw new Error("Hostel not found.");
  }

  // Check if hostel is active
  if (!hostel.isActive) {
    throw new Error("This hostel is currently inactive.");
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
    throw new Error("You are not allowed to view complaints.");
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
    throw new Error("Complaint not found.");
  }

  // Student → Only own complaint
  if (
    user.role === ROLES.STUDENT &&
    complaint.createdBy._id.toString() !== user._id.toString()
  ) {
    throw new Error("You are not allowed to view this complaint.");
  }

  // Warden → Complaint must belong to same hostel
  if (
    user.role === ROLES.WARDEN &&
    complaint.hostel._id.toString() !== user.hostel.toString()
  ) {
    throw new Error("You are not allowed to view this complaint.");
  }

  // Worker → Only assigned complaint
  if (
    user.role === ROLES.WORKER &&
    (!complaint.assignedWorker ||
      complaint.assignedWorker._id.toString() !== user._id.toString())
  ) {
    throw new Error("You are not allowed to view this complaint.");
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
    throw new Error("Complaint not found.");
  }

  // Complaint must belong to warden's hostel
  if (complaint.hostel.toString() !== user.hostel.toString()) {
    throw new Error("You are not allowed to assign workers for this hostel.");
  }

  // Find Worker
  const worker = await Staff.findById(workerId);

  if (!worker) {
    throw new Error("Worker not found.");
  }

  // Worker role validation
  if (worker.role !== ROLES.WORKER) {
    throw new Error("Selected staff member is not a worker.");
  }

  // Worker must belong to same hostel
  if (worker.hostel.toString() !== user.hostel.toString()) {
    throw new Error("Worker belongs to another hostel.");
  }

  // Assign Worker
  complaint.assignedWorker = worker._id;
  complaint.assignedBy = user._id;
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
  // Find Complaint
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) {
    throw new Error("Complaint not found.");
  }

  // Only assigned worker can update status
  if (
    !complaint.assignedWorker ||
    complaint.assignedWorker.toString() !== user._id.toString()
  ) {
    throw new Error("You are not assigned to this complaint.");
  }

  // Allowed Status Transitions
  if (
    complaint.status === COMPLAINT_STATUS.ASSIGNED &&
    status !== COMPLAINT_STATUS.IN_PROGRESS
  ) {
    throw new Error("Assigned complaints can only be moved to In Progress.");
  }

  if (
    complaint.status === COMPLAINT_STATUS.IN_PROGRESS &&
    status !== COMPLAINT_STATUS.COMPLETED
  ) {
    throw new Error("In Progress complaints can only be marked Completed.");
  }

  if (complaint.status === COMPLAINT_STATUS.COMPLETED) {
    throw new Error("Complaint is already completed.");
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
// 7. Export
// ===============================

export {
  createComplaint,
  getComplaints,
  getComplaintById,
  assignWorker,
  updateComplaintStatus,
};
