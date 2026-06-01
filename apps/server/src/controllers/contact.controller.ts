import { Request, Response } from "express";
import { sendEmail } from "../services/mailer.service";
import AppError from "../utils/AppError";

const sendContactInfo = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body ?? {};

  const to = process.env.EMAIL_INFO || "[EMAIL_ADDRESS]";

  try {
    const payload = {
      to,
      subject,
      html: `
        <h2>New Contact Form Submission from ResumeForge</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        `,
    };

    await sendEmail(payload);

    return res.status(200).json({
      status: "success",
      message: "Contact info sent successfully",
    });
  } catch (error) {
    console.error("Failed to send contact info:", error);
    throw new AppError("Failed to send contact info. Please try again.", 500);
  }
};

export { sendContactInfo };
