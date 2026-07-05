import authRoutes from "./routes/authRoutes.js";
import express from "express";
import cors from "cors";
import hostelRoutes from "./routes/hostelRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hostels", hostelRoutes);

console.log("app.js loaded");

app.get("/", (req, res) => {
  console.log("GET / hit");

  res.json({
    success: true,
    message: "FixFlow Backend Running 🚀",
  });
});

export default app;
