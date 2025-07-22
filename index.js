import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.route.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", router); // Changed to /api prefix for clarity

// Health check endpoint
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Export as Vercel serverless function
export default async (req, res) => {
  return app(req, res);
};
