// ===============================
// 1. Health Check
// ===============================

const getHealthController = (req, res) => {
  res.status(200).json({
    success: true,
    message: "FixFlow API is healthy.",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
};

// ===============================
// 2. Export
// ===============================

export { getHealthController };
