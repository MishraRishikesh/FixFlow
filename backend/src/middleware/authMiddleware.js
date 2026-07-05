// ===============================
// 1. Imports
// ===============================

import jwt from "jsonwebtoken";
import Staff from "../models/Staff.js";

// ===============================
// 2. Authentication Middleware
// ===============================

const verifyToken = async (req, res, next) => {
  // Read Authorization Header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing.",
    });
  }

  // Extract Token
  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
    const user = await Staff.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Attach User to Request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// ===============================
// 3. Export
// ===============================

export { verifyToken };
