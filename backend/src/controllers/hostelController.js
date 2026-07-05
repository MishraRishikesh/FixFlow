// ===============================
// 1. Imports
// ===============================

import {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deactivateHostel,
} from "../services/hostelService.js";

// ===============================
// 2. Controller Functions
// ===============================

const create = async (req, res) => {
  try {
    const hostel = await createHostel(req.body, req.user);

    res.status(201).json({
      success: true,
      message: "Hostel created successfully.",
      data: hostel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// 3. Get All Hostels
// ===============================

const getAll = async (req, res) => {
  try {
    const hostels = await getAllHostels();

    res.status(200).json({
      success: true,
      count: hostels.length,
      data: hostels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// 4. Get Hostel By ID
// ===============================

const getById = async (req, res) => {
  try {
    const hostel = await getHostelById(req.params.id);

    res.status(200).json({
      success: true,
      data: hostel,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// 5. Update Hostel
// ===============================

const update = async (req, res) => {
  try {
    const hostel = await updateHostel(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Hostel updated successfully.",
      data: hostel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// 6. Deactivate Hostel
// ===============================

const deactivate = async (req, res) => {
  try {
    const hostel = await deactivateHostel(req.params.id);

    res.status(200).json({
      success: true,
      message: "Hostel deactivated successfully.",
      data: hostel,
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

export { create, getAll, getById, update, deactivate };
