import rateLimit from "express-rate-limit";

/** General limiter — covers all routes */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  trust: true, // Trust Cloud Run reverse proxies
  keyGenerator: (req: any) => {
    // Use X-Forwarded-For for Cloud Run
    return (req.headers["x-forwarded-for"] as string) || req.ip || "unknown";
  },
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
    statusCode: 429,
  },
} as any);

/** Strict limiter — for the costly PDF-generation endpoint */
export const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 resume generations per hour per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  trust: true, // Trust Cloud Run reverse proxies
  keyGenerator: (req: any) => {
    // Use X-Forwarded-For for Cloud Run
    return (req.headers["x-forwarded-for"] as string) || req.ip || "unknown";
  },
  message: {
    success: false,
    message:
      "Resume generation limit reached (10/hour). Please try again later.",
    statusCode: 429,
  },
} as any);
