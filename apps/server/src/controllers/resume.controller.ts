import { Request, Response } from "express";
import AppError from "../utils/AppError";
import { parseResumeFile } from "../services/parse.service";
import { tailorResume } from "../services/ai.service";

const generateResume = async (req: Request, res: Response) => {
  const file = req.file;
  const { jobDescription } = req.body ?? {};

  if (!file) {
    throw new AppError("Please upload a file", 400);
  }

  if (!jobDescription) {
    throw new AppError("Please provide a job description", 400);
  }

  const rawText = await parseResumeFile(file.buffer, file.mimetype);

  const resumeData = await tailorResume(rawText, jobDescription);

  console.log("resumeData: ", resumeData);

  res.json({
    success: true,
    message: "File uploaded successfully",
    data: {
      jobDescription,
      file,
    },
  });
};

export { generateResume };
