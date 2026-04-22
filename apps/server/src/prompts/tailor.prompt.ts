import { ResumeData } from "../types";

/**
 * System instruction for the Gemini model.
 * Sets its persona and hard constraints.
 */
export const SYSTEM_INSTRUCTION = `
You are an expert ATS (Applicant Tracking System) resume writer and career coach.
Your job is to rewrite a candidate's resume so that it is perfectly tailored to a given job description.

Rules you MUST follow:
1. Output ONLY valid JSON that matches the schema exactly — no markdown fences, no extra keys, no prose.
2. Never hallucinate credentials, companies, schools, or dates that do not exist in the original resume.
3. Rewrite bullet points with strong action verbs and quantifiable achievements where the original supports it.
4. Mirror the exact keywords and phrases from the job description to maximise ATS keyword matching.
5. Keep the summary between 2–4 sentences. It must address the specific role and company tone.
6. Consolidate redundant skills and group them into logical categories (e.g. "Languages", "Frameworks", "Cloud").
7. If a field has no data in the original resume (e.g. no LinkedIn), output an empty string "" — never omit the key.
8. Dates must stay in the original format found in the resume (e.g. "Jan 2022", "2022-01", "2022" are all fine).
`.trim();

/**
 * Builds the user-facing prompt sent alongside the system instruction.
 *
 * @param resumeText     - Raw text extracted from the uploaded resume file
 * @param jobDescription - The job description the candidate is applying for
 */
export const buildUserPrompt = (
  resumeText: string,
  jobDescription: string
): string => `
=== ORIGINAL RESUME ===
${resumeText}

=== JOB DESCRIPTION ===
${jobDescription}

=== OUTPUT SCHEMA (JSON only — no markdown) ===
${buildJsonSchema()}

Rewrite the resume to perfectly match the job description.
Return ONLY the JSON object — no explanation, no code fences.
`.trim();

/**
 * Inline JSON schema description injected into the prompt so the model
 * knows exactly what structure is expected.
 */
const buildJsonSchema = (): string => {
  const template: ResumeData = {
    name: "Full Name",
    email: "email@example.com",
    phone: "+1 (555) 000-0000",
    location: "City, State",
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    portfolio: "https://portfolio.dev",
    summary: "2-4 sentence ATS-optimized professional summary",
    skills: [
      {
        category: "Category Name (e.g. Languages)",
        items: ["Skill A", "Skill B"],
      },
    ],
    experience: [
      {
        title: "Job Title",
        company: "Company Name",
        location: "City, State or Remote",
        startDate: "Mon YYYY",
        endDate: "Mon YYYY or Present",
        bullets: [
          "Action verb + task + quantified result",
          "Action verb + task + quantified result",
        ],
      },
    ],
    education: [
      {
        degree: "Degree Name & Field of Study",
        institution: "University Name",
        location: "City, State",
        graduationDate: "Mon YYYY",
        gpa: "3.9 (omit key if not applicable)",
      },
    ],
    certifications: [
      {
        name: "Certification Name",
        issuer: "Issuing Body",
        date: "Mon YYYY",
      },
    ],
    projects: [
      {
        name: "Project Name",
        description: "One sentence description",
        technologies: ["Tech A", "Tech B"],
        url: "https://github.com/...",
      },
    ],
  };

  return JSON.stringify(template, null, 2);
};
