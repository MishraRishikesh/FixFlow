// ===============================
// 1. Authorization Middleware
// ===============================

const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action.",
      });
    }

    next();
  };

// ===============================
// 2. Head Warden Middleware
// ===============================

const requireHeadWarden = (req, res, next) => {
  if (!req.user.isHeadWarden) {
    return res.status(403).json({
      success: false,
      message: "Only Head Wardens can perform this action.",
    });
  }

  next();
};

// ===============================
// 3. Export
// ===============================

export { authorize, requireHeadWarden };
