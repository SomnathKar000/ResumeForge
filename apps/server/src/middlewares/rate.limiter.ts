import rateLimit from "express-rate-limit";
import type { Request } from "express";

/**
 * Safely extract client IP
 */
const getClientIp = (req: Request): string => {
  return req.ip || "unknown";
};

/** General limiter — covers all routes */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  keyGenerator: (req: Request) => getClientIp(req),

  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
    statusCode: 429,
  },
});

/** Strict limiter — for PDF generation */
export const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  keyGenerator: (req: Request) => getClientIp(req),

  message: {
    success: false,
    message:
      "Resume generation limit reached (10/hour). Please try again later.",
    statusCode: 429,
  },
});
