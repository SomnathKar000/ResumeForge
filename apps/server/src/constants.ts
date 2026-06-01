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

export const DEFAULT_FROM = "ResumeForge <noreply@resumeforge.com>";
