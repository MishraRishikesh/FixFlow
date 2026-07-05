// ===============================
// 1. Imports
// ===============================

import jwt from "jsonwebtoken";

// ===============================
// 2. Generate JWT
// ===============================

const generateToken = user => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      hostel: user.hostel,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

// ===============================
// 3. Export
// ===============================

export default generateToken;
