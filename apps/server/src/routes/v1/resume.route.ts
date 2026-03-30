import { Router, Request, Response } from "express";
import asyncHandler from "../../middlewares/asyncHandler";

const router = Router();

router.post(
  "/generate",
  asyncHandler((req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Resume generated successfully",
    });
  }),
);

export default router;
