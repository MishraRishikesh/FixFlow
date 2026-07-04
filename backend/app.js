import express from "express";
import cors from "cors";

import healthRoutes from "./routes/healthRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);

export default app;
