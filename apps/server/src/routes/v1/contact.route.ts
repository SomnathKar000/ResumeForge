import { Router } from "express";
import asyncHandler from "../../middlewares/async.handler";
import { sendContactInfo } from "../../controllers/contact.controller";

const router = Router();

router.post("/contact-info", asyncHandler(sendContactInfo));

export default router;
