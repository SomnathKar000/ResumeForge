import puppeteer from "puppeteer";
import { ResumeData } from "../types";
import { buildResumeHtml } from "./template.service";
import AppError from "../utils/AppError";

/**
 * Renders a ResumeData object to a PDF buffer via Puppeteer.
 *
 * Pipeline:
 *   ResumeData → buildResumeHtml() → HTML string → Puppeteer → PDF Buffer
 *
 * @param resumeData - Structured resume data from ai.service
 * @returns PDF as a Node.js Buffer
 */
const generateResumePDF = async (resumeData: ResumeData): Promise<Buffer> => {
  const html = buildResumeHtml(resumeData);

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage", // avoids crashes in Docker / CI
      ],
    });

    const page = await browser.newPage();

    // Load the HTML directly — no network round-trip needed
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "Letter",  // 8.5 × 11 in — standard US resume paper
      printBackground: true,
      margin: {
        top: "0.5in",
        bottom: "0.5in",
        left: "0.65in",
        right: "0.65in",
      },
    });

    return Buffer.from(pdfBuffer);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new AppError(`PDF generation failed: ${message}`, 500);
  } finally {
    // Always close the browser, even on error
    if (browser) await browser.close();
  }
};

export { generateResumePDF };
