import { GoogleGenerativeAI } from "@google/generative-ai";
import AppError from "../utils/AppError";
import { ResumeData } from "../types";
import { SYSTEM_INSTRUCTION, buildUserPrompt } from "../prompts/tailor.prompt";

// ---------------------------------------------------------------------------
// Client initialisation
// ---------------------------------------------------------------------------

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is not set. Add it to your .env file before starting the server."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Gemini model used for resume tailoring.
 * gemini-2.0-flash gives a great speed / quality balance for structured JSON tasks.
 */
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: SYSTEM_INSTRUCTION,
  generationConfig: {
    // Ask Gemini to return JSON directly (no markdown fences)
    responseMimeType: "application/json",
    temperature: 0.4,   // low enough for consistent structure, high enough for quality rewrites
    topP: 0.9,
    maxOutputTokens: 8192,
  },
});

// ---------------------------------------------------------------------------
// Core function
// ---------------------------------------------------------------------------

/**
 * Sends the extracted resume text + job description to Gemini and returns
 * a structured `ResumeData` object ready for template injection.
 *
 * @param resumeText     - Raw plain-text extracted from the uploaded file
 * @param jobDescription - The job description the candidate is targeting
 * @returns A fully-typed `ResumeData` object
 * @throws AppError on API failure or invalid JSON response
 */
const tailorResume = async (
  resumeText: string,
  jobDescription: string
): Promise<ResumeData> => {
  const userPrompt = buildUserPrompt(resumeText, jobDescription);

  let rawJson: string;

  try {
    const result = await model.generateContent(userPrompt);
    rawJson = result.response.text();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new AppError(`Gemini API error: ${message}`, 502);
  }

  // Strip accidental markdown code fences (safety net)
  const cleaned = rawJson
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  let resumeData: ResumeData;

  try {
    resumeData = JSON.parse(cleaned) as ResumeData;
  } catch {
    console.error("[ai.service] Invalid JSON from Gemini:\n", cleaned);
    throw new AppError(
      "Gemini returned an invalid response. Please try again.",
      502
    );
  }

  // Basic sanity check — ensure we have the required top-level fields
  const required: (keyof ResumeData)[] = [
    "name",
    "email",
    "summary",
    "experience",
    "education",
    "skills",
  ];

  for (const key of required) {
    if (!resumeData[key]) {
      throw new AppError(
        `Gemini response is missing the required field: "${key}". Please try again.`,
        502
      );
    }
  }

  return resumeData;
};

export { tailorResume };
