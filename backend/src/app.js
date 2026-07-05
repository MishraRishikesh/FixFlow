import authRoutes from "./routes/authRoutes.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

console.log("app.js loaded");

app.get("/", (req, res) => {
  console.log("GET / hit");

  res.json({
    success: true,
    message: "FixFlow Backend Running 🚀",
  });
});

export default app;
