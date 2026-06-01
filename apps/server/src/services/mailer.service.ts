import { Resend } from "resend";
import AppError from "../utils/AppError";
import { DEFAULT_FROM } from "../constants";
import { SendEmailOptions } from "../types";

// Lazy singleton — created once on first use, not at module load time.
// This avoids crashes when RESEND_API_KEY hasn't been loaded from .env yet.
let resendClient: Resend | null = null;

const getResendClient = (): Resend => {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new AppError(
        "RESEND_API_KEY is not set. Add it to your .env file.",
        500
      );
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
};

/**
 * Sends a transactional email via Resend.
 * Throws an AppError with HTTP 500 if the email fails to send.
 */
const sendEmail = async ({
  to,
  subject,
  html,
  from = DEFAULT_FROM,
}: SendEmailOptions): Promise<void> => {
  const resend = getResendClient();
  const { error } = await resend.emails.send({ from, to, subject, html });

  if (error) {
    throw new AppError(`Failed to send email: ${error.message}`, 500);
  }
};

export { sendEmail };
