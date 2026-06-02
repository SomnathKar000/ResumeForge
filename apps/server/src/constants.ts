/**
 * MIME types accepted for resume uploads.
 * Used by:
 *  - upload.middleware.ts  → multer fileFilter
 *  - parse.service.ts      → dispatcher (PDF vs DOCX branch)
 */
export const RESUME_MIME_TYPES = {
  PDF: "application/pdf",
  DOC: "application/msword",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;

/** Flat array for fast `.includes()` checks (e.g. multer fileFilter). */
export const ALLOWED_MIME_TYPES = Object.values(RESUME_MIME_TYPES) as string[];

// TODO: Switch back to "ResumeForge <noreply@resumeforge.com>" once resumeforge.com
// is verified on Resend → https://resend.com/domains
export const DEFAULT_FROM = "onboarding@resend.dev";
