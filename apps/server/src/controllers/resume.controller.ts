import { Request, Response } from "express";
import AppError from "../utils/AppError";

const generateResume = async (req: Request, res: Response) => {
  const file = req.file;
  const { jobDescription } = req.body;

  if (!file) {
    throw new AppError("Please upload a file", 400);
  }

  if (!jobDescription) {
    throw new AppError("Please provide a job description", 400);
  }

  console.log("jobDescription: ", jobDescription);
  console.log("Buffer ", file.buffer);
  console.log("mimetype: ", file.mimetype);
  console.log("size: ", file.size);
  console.log("originalname: ", file.originalname);

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
