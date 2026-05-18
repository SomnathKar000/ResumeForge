import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import pLimit from "p-limit";
import { ResumeData } from "../types";
import { buildResumeHtml } from "./template.service";
import AppError from "../utils/AppError";

// ---------------------------------------------------------------------------
// Concurrency limiter — only 1 Chromium process at a time on 0.5 GB RAM.
// Requests queue rather than crash with OOM.
// ---------------------------------------------------------------------------
const limit = pLimit(1);

// ---------------------------------------------------------------------------
// Chromium launch args tuned for a memory-constrained container
// ---------------------------------------------------------------------------
const CHROME_ARGS = [
  ...chromium.args,
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",   // avoid /dev/shm exhaustion in Docker
  "--disable-gpu",              // no GPU in a headless container
  "--no-zygote",                // skip zygote process fork → saves ~20 MB
  "--single-process",           // renderer runs in-process → saves ~40 MB
  "--js-flags=--max-old-space-size=64", // cap V8 heap inside Chromium
];

/**
 * Renders a ResumeData object to a PDF buffer via Puppeteer + @sparticuz/chromium.
 *
 * Chromium is slimmed (~50 MB) vs the full Puppeteer bundle (~300 MB).
 * Only 1 instance runs at a time (p-limit) to stay within 0.5 GB RAM.
 *
 * @param resumeData - Structured resume data from ai.service
 * @returns PDF as a Node.js Buffer
 */
const generateResumePDF = (resumeData: ResumeData): Promise<Buffer> =>
  limit(async () => {
    const html = buildResumeHtml(resumeData);

    let browser;

    try {
      browser = await puppeteer.launch({
        args: CHROME_ARGS,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });

      const page = await browser.newPage();

      // Load the HTML directly — no network round-trip needed
      await page.setContent(html, { waitUntil: "networkidle0" });

      const pdfBuffer = await page.pdf({
        format: "Letter",      // 8.5 × 11 in — standard US resume paper
        printBackground: true,
        // Margins are handled by @page CSS in the template
        margin: { top: "0", bottom: "0", left: "0", right: "0" },
        // scale < 1 shrinks content so everything fits on one page
        scale: 0.92,
        pageRanges: "1",       // hard-limit to page 1
      });

      return Buffer.from(pdfBuffer);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      throw new AppError(`PDF generation failed: ${message}`, 500);
    } finally {
      // Always close the browser, even on error
      if (browser) await browser.close();
    }
  });

export { generateResumePDF };
