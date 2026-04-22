import { Request, Response } from "express";
import AppError from "../utils/AppError";
import { parseResumeFile } from "../services/parse.service";
import { tailorResume } from "../services/ai.service";
import { generateResumePDF } from "../services/pdf.service";

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
  const pdfBuffer = await generateResumePDF(resumeData);

  const filename = `resume-${Date.now()}.pdf`;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Length", pdfBuffer.length);
  res.send(pdfBuffer);
};

export { generateResume };
