// ===============================
// 1. Imports
// ===============================

import Hostel from "../models/Hostel.js";

// ===============================
// 2. Service Functions
// ===============================

const createHostel = async (hostelData, user) => {
  const { name, code, capacity } = hostelData;

  // Check if a hostel with the same code already exists
  const existingHostel = await Hostel.findOne({
    code,
  });

  if (existingHostel) {
    throw new Error("Hostel code already exists.");
  }

  // Create the new hostel
  const hostel = await Hostel.create({
    name,
    code,
    capacity,
    createdBy: user._id,
  });

  return hostel;
};
// ===============================
// 3. Get All Hostels
// ===============================

const getAllHostels = async () => {
  const hostels = await Hostel.find()
    .populate("createdBy", "name email role")
    .sort({ createdAt: -1 });

  return hostels;
};
// ===============================
// 4. Get Hostel By ID
// ===============================

const getHostelById = async hostelId => {
  const hostel = await Hostel.findById(hostelId).populate(
    "createdBy",
    "name email role",
  );

  if (!hostel) {
    throw new Error("Hostel not found.");
  }

  return hostel;
};
// ===============================
// 5. Update Hostel
// ===============================

const updateHostel = async (hostelId, hostelData) => {
  const { name, code, capacity } = hostelData;

  // Check if hostel exists
  const hostel = await Hostel.findById(hostelId);

  if (!hostel) {
    throw new Error("Hostel not found.");
  }

  // Check if code is already used by another hostel
  const existingHostel = await Hostel.findOne({
    code,
    _id: { $ne: hostelId },
  });

  if (existingHostel) {
    throw new Error("Hostel code already exists.");
  }

  hostel.name = name;
  hostel.code = code;
  hostel.capacity = capacity;

  await hostel.save();

  return hostel;
};
// ===============================
// 6. Deactivate Hostel
// ===============================

const deactivateHostel = async hostelId => {
  const hostel = await Hostel.findById(hostelId);

  if (!hostel) {
    throw new Error("Hostel not found.");
  }

  hostel.isActive = false;

  await hostel.save();

  return hostel;
};
// ===============================
// 7. Export
// ===============================

export {
  createHostel,
  getAllHostels,
  getHostelById,
  updateHostel,
  deactivateHostel,
};
