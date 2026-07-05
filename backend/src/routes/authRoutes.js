// 1. Imports

import express from "express";
import { register, login } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

// 2. Router

const router = express.Router();

// 3. Routes

router.post("/register", register);
router.post("/login", login);

router.get("/me", verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// 4. Export

export default router;
