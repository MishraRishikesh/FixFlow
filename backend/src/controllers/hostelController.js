// ===============================
// 1. Imports
// ===============================

import {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  updateHostelStatus,
} from "../services/hostelService.js";
import asyncHandler from "../utils/asyncHandler.js";

// ===============================
// 2. Create Hostel
// ===============================

const createHostelController = asyncHandler(async (req, res) => {
  const hostel = await createHostel(req.body, req.user);

  res.status(201).json({
    success: true,
    message: "Hostel created successfully.",
    data: hostel,
  });
});

// ===============================
// 3. Get All Hostels
// ===============================

const getAllHostelsController = asyncHandler(async (req, res) => {
  const hostels = await getAllHostels();

  res.status(200).json({
    success: true,
    count: hostels.length,
    data: hostels,
  });
});
// ===============================
// 4. Get Hostel By ID
// ===============================

const getHostelByIdController = asyncHandler(async (req, res) => {
  const hostel = await getHostelById(req.params.id);

  res.status(200).json({
    success: true,
    data: hostel,
  });
});
// ===============================
// 5. Update Hostel
// ===============================

const updateHostelController = asyncHandler(async (req, res) => {
  const hostel = await updateHostel(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Hostel updated successfully.",
    data: hostel,
  });
});
// ===============================
// 6. Update Hostel Status
// ===============================

const updateHostelStatusController = asyncHandler(async (req, res) => {
  const hostel = await updateHostelStatus(req.params.id, req.body.isActive);

  res.status(200).json({
    success: true,
    message: `Hostel ${
      hostel.isActive ? "activated" : "deactivated"
    } successfully.`,
    data: hostel,
  });
});
// ===============================
// 7. Export
// ===============================

export {
  createHostelController,
  getAllHostelsController,
  getHostelByIdController,
  updateHostelController,
  updateHostelStatusController,
};
