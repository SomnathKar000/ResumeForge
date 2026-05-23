import express from "express";
import resumeRoutes from "./routes/v1/resume.route";
import cors from "cors";
import dotenv from "dotenv";
import { generalLimiter, generateLimiter } from "./middlewares/rate.limiter";
import { errorHandler, notFoundHandler } from "./middlewares/error.handler";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json({ limit: "512kb" }));
app.use(express.urlencoded({ extended: true, limit: "512kb" }));

const PORT = process.env.PORT || 8080;
const API_PREFIX = process.env.API_PREFIX || "/api/v1";

app.use(generalLimiter);
app.use(`${API_PREFIX}/resume/generate`, generateLimiter);

app.use(API_PREFIX, resumeRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
