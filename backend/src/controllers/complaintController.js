// ===============================
// 1. Imports
// ===============================

import {
  createComplaint,
  getComplaints,
  getComplaintById,
  assignWorker,
  updateComplaint,
  updateComplaintStatus,
  deleteComplaint,
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
// 3. Update Complaint
// ===============================

const updateComplaintController = asyncHandler(async (req, res) => {
  const complaint = await updateComplaint(req.params.id, req.body, req.user);

  res.status(200).json({
    success: true,
    message: "Complaint updated successfully.",
    data: complaint,
  });
});

// ===============================
// 4. Get Complaints
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
// 5. Get Complaint By ID
// ===============================

const getComplaintByIdController = asyncHandler(async (req, res) => {
  const complaint = await getComplaintById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: complaint,
  });
});
// ===============================
// 6. Assign Worker
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
// 7. Update Complaint Status
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
// 8. Delete Complaint
// ===============================

const deleteComplaintController = asyncHandler(async (req, res) => {
  await deleteComplaint(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Complaint deleted successfully.",
  });
});

// ===============================
// 9. Export
// ===============================

export {
  createComplaintController,
  getComplaintsController,
  getComplaintByIdController,
  assignWorkerController,
  updateComplaintStatusController,
  updateComplaintController,
  deleteComplaintController,
};
