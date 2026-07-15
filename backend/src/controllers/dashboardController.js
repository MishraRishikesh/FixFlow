// ===============================
// 1. Imports
// ===============================

import asyncHandler from "../utils/asyncHandler.js";
import { getDashboardSummary } from "../services/dashboardService.js";

// ===============================
// 2. Dashboard Summary
// ===============================

export const getDashboardSummaryController = asyncHandler(async (req, res) => {
  const dashboard = await getDashboardSummary(req.user);

  res.status(200).json({
    success: true,
    message: "Dashboard fetched successfully.",
    data: dashboard,
  });
});
