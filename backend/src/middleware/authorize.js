// ===============================
// 1. Authorization Middleware
// ===============================

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action.",
      });
    }

    next();
  };
};

// ===============================
// 2. Export
// ===============================

export { authorize };
