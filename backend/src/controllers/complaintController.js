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

// ===============================
// 2. Create Complaint
// ===============================

const create = async (req, res) => {
  try {
    const complaint = await createComplaint(req.body, req.user);

    res.status(201).json({
      success: true,
      message: "Complaint created successfully.",
      data: complaint,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 3. Get Complaints
// ===============================

const getAll = async (req, res) => {
  try {
    const complaints = await getComplaints(req.user);

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 4. Get Complaint By ID
// ===============================

const getById = async (req, res) => {
  try {
    const complaint = await getComplaintById(req.params.id, req.user);

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// 5. Assign Worker
// ===============================

const assign = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// 6. Update Complaint Status
// ===============================

const updateStatus = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// 7. Export
// ===============================

export { create, getAll, getById, assign, updateStatus };
