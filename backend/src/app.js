import authRoutes from "./routes/authRoutes.js";
import express from "express";
import cors from "cors";
import hostelRoutes from "./routes/hostelRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/staff", staffRoutes);
console.log("app.js loaded");

app.get("/", (req, res) => {
  console.log("GET / hit");

  res.json({
    success: true,
    message: "FixFlow Backend Running 🚀",
  });
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
