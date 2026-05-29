import { Resend } from "resend";
import AppError from "../utils/AppError";
import { DEFAULT_FROM } from "../constants";
import { SendEmailOptions } from "../types";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  const { error } = await resend.emails.send({ from, to, subject, html });

  if (error) {
    throw new AppError(`Failed to send email: ${error.message}`, 500);
  }
};

export { sendEmail };
