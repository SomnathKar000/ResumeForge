import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import pLimit from "p-limit";
import { ResumeData } from "../types";
import { buildResumeHtml } from "./template.service";
import AppError from "../utils/AppError";

// ---------------------------------------------------------------------------
// Concurrency limiter — only 1 Chromium process at a time on 0.5 GB RAM.
// ---------------------------------------------------------------------------
const limit = pLimit(1);

// ---------------------------------------------------------------------------
// Resolve the Chromium executable path.
//
// Priority:
//   1. CHROMIUM_EXECUTABLE_PATH env var  → used in local dev (macOS/Windows)
//      e.g. /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
//   2. @sparticuz/chromium               → used in production (Railway/Linux)
// ---------------------------------------------------------------------------
const getExecutablePath = async (): Promise<string> => {
  if (process.env.CHROMIUM_EXECUTABLE_PATH) {
    return process.env.CHROMIUM_EXECUTABLE_PATH;
  }
  return chromium.executablePath();
};

// ---------------------------------------------------------------------------
// Chromium launch args tuned for a memory-constrained container.
// When running with a local Chrome (dev), chromium.args is still fine to spread.
// ---------------------------------------------------------------------------
const EXTRA_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--no-zygote",
  "--single-process",
  "--js-flags=--max-old-space-size=64",
];

/**
 * Renders a ResumeData object to a PDF buffer via Puppeteer.
 *
 * Uses @sparticuz/chromium in production (Railway) and the system Chrome
 * (via CHROMIUM_EXECUTABLE_PATH env var) in local development.
 *
 * Only 1 instance runs at a time (p-limit) to stay within 0.5 GB RAM.
 *
 * @param resumeData - Structured resume data from ai.service
 * @returns PDF as a Node.js Buffer
 */
const generateResumePDF = (resumeData: ResumeData): Promise<Buffer> =>
  limit(async () => {
    const html = buildResumeHtml(resumeData);
    const executablePath = await getExecutablePath();

    // Use slimmed args only in production; local Chrome ignores unknown flags
    // but we keep them harmless for cross-platform consistency.
    const args = process.env.CHROMIUM_EXECUTABLE_PATH
      ? ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
      : [...chromium.args, ...EXTRA_ARGS];

    let browser;

    try {
      browser = await puppeteer.launch({
        args,
        executablePath,
        headless: true,
      });

      const page = await browser.newPage();

      // Load HTML directly — no network round-trip needed
      await page.setContent(html, { waitUntil: "networkidle0" });

      const pdfBuffer = await page.pdf({
        format: "Letter",
        printBackground: true,
        margin: { top: "0", bottom: "0", left: "0", right: "0" },
        scale: 0.92,
        pageRanges: "1",
      });

      return Buffer.from(pdfBuffer);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      throw new AppError(`PDF generation failed: ${message}`, 500);
    } finally {
      if (browser) await browser.close();
    }
  });

export { generateResumePDF };
