import express from "express";
import resumeRoutes from "./routes/v1/resume.route";
import contactRoute from "./routes/v1/contact.route";
import cors from "cors";
import dotenv from "dotenv";
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

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const API_PREFIX = process.env.API_PREFIX || "/api/v1";

app.use(API_PREFIX, resumeRoutes);
app.use(API_PREFIX, contactRoute);

app.get("/health", (_, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
