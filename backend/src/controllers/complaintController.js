// ===============================
// 1. Imports
// ===============================

import {
  createComplaint,
  getComplaints,
  getComplaintById,
  assignWorker,
  updateComplaintStatus,
} from "../services/complaintService.js";
import asyncHandler from "../utils/asyncHandler.js";

// ===============================
// 2. Create Complaint
// ===============================

const createComplaintController = asyncHandler(async (req, res) => {
  const complaint = await createComplaint(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Complaint created successfully.",
    data: complaint,
  });
});

// ===============================
// 3. Get Complaints
// ===============================

const getComplaintsController = asyncHandler(async (req, res) => {
  const complaints = await getComplaints(req.user);

  res.status(200).json({
    success: true,
    count: complaints.length,
    data: complaints,
  });
});

// ===============================
// 4. Get Complaint By ID
// ===============================

const getComplaintByIdController = asyncHandler(async (req, res) => {
  const complaint = await getComplaintById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: complaint,
  });
});
// ===============================
// 5. Assign Worker
// ===============================

const assignWorkerController = asyncHandler(async (req, res) => {
  const complaint = await assignWorker(
    req.params.id,
    req.body.workerId,
    req.user,
  );

  res.status(200).json({
    success: true,
    message: "Worker assigned successfully.",
    data: complaint,
  });
});
// ===============================
// 6. Update Complaint Status
// ===============================

const updateComplaintStatusController = asyncHandler(async (req, res) => {
  const complaint = await updateComplaintStatus(
    req.params.id,
    req.body.status,
    req.user,
  );

  res.status(200).json({
    success: true,
    message: "Complaint status updated successfully.",
    data: complaint,
  });
});
// ===============================
// 7. Export
// ===============================

export {
  createComplaintController,
  getComplaintsController,
  getComplaintByIdController,
  assignWorkerController,
  updateComplaintStatusController,
};
