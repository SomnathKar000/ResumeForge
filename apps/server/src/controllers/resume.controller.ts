import { Request, Response } from "express";
import AppError from "../utils/AppError";
import { parseResumeFile } from "../services/parse.service";

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

  console.log("rawText: ", rawText);

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
