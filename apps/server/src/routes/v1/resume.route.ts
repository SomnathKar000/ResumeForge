import { Router } from "express";
import asyncHandler from "../../middlewares/async.handler";
import { generateResume } from "../../controllers/resume.controller";
import upload from "../../middlewares/upload.middleware";

const router = Router();

router.post("/generate", upload.single("resume"), asyncHandler(generateResume));

export default router;
