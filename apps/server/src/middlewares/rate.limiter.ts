import rateLimit from "express-rate-limit";
import type { Request, Response } from "express";

const createLimiter = ({
  windowMs,
  max,
  message,
}: {
  windowMs: number;
  max: number;
  message: string;
}) =>
  rateLimit({
    windowMs,
    max,

    standardHeaders: "draft-8",
    legacyHeaders: false,

    skip: (req) => req.path === "/health",

    keyGenerator: (req: Request) => req.ip || "unknown",

    handler: (_req: Request, res: Response) => {
      res.status(429).json({
        success: false,
        statusCode: 429,
        message,
      });
    },
  });

export const generalLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again after 15 minutes.",
});

export const generateLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Resume generation limit reached (10/hour). Please try again later.",
});
