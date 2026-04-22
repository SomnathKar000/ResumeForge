import fs from "fs";
import path from "path";
import { ResumeData } from "../types";

// Resolve template path relative to this file (works in both ts-node and compiled JS)
const TEMPLATE_PATH = path.join(__dirname, "../templates/resume.template.html");

// ─── helpers ────────────────────────────────────────────────────────────────

/** Escape characters that could break HTML or introduce XSS. */
const esc = (str: string = ""): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Renders a single optional link item separated by a pipe. */
const optionalLink = (value: string | undefined, href: string): string =>
  value ? ` &nbsp;|&nbsp; <a href="${href}">${esc(value)}</a>` : "";

/** Builds the combined optional-links string (LinkedIn | GitHub | Portfolio). */
const buildLinksRow = (data: ResumeData): string =>
  [
    data.linkedin  ? optionalLink(data.linkedin,  data.linkedin)  : "",
    data.github    ? optionalLink(data.github,     data.github)    : "",
    data.portfolio ? optionalLink(data.portfolio,  data.portfolio) : "",
  ]
    .filter(Boolean)
    .join("");

/**
 * Builds the bold tagline line shown under the name.
 * Uses the top skill category names joined with " | ", e.g.:
 * "Digital Marketing | SEO | Content Marketing"
 */
const buildTagline = (skills: ResumeData["skills"]): string =>
  skills
    .slice(0, 4)              // cap at 4 categories to keep it on one line
    .map((s) => esc(s.category))
    .join(" | ");

// ─── section builders ────────────────────────────────────────────────────────

/**
 * Flat bullet list of all skill items grouped by category row.
 * Each <li> is one category's items joined by commas — matching the reference design.
 */
const buildSkillItems = (skills: ResumeData["skills"]): string =>
  skills
    .map(({ items }) => `<li>${items.map(esc).join(", ")}</li>`)
    .join("\n        ");

const buildExperienceEntries = (
  experience: ResumeData["experience"]
): string =>
  experience
    .map(
      ({ title, company, location, startDate, endDate, bullets }) => `
    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <div class="entry-title">${esc(title)}</div>
          <div class="entry-subtitle">${esc(company)}, ${esc(location)}</div>
        </div>
        <div class="entry-date">${esc(startDate)} &ndash; ${esc(endDate)}</div>
      </div>
      <ul class="bullets">
        ${bullets.map((b) => `<li>${esc(b)}</li>`).join("\n        ")}
      </ul>
    </div>`
    )
    .join("\n");

const buildEducationEntries = (education: ResumeData["education"]): string =>
  education
    .map(
      ({ degree, institution, location, graduationDate, gpa }) => `
    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <div class="entry-title">${esc(degree)}</div>
          <div class="entry-subtitle">${esc(institution)}, ${esc(location)}</div>
          ${gpa ? `<div class="entry-subtitle">GPA: ${esc(gpa)}</div>` : ""}
        </div>
        <div class="entry-date">Graduated: ${esc(graduationDate)}</div>
      </div>
    </div>`
    )
    .join("\n");

/**
 * Certifications rendered as a flat bullet list (name only per item).
 */
const buildCertificationsSection = (
  certifications: ResumeData["certifications"]
): string => {
  if (!certifications?.length) return "";

  const items = certifications
    .map(({ name }) => `<li>${esc(name)}</li>`)
    .join("\n        ");

  return `
    <section class="section" id="certifications">
      <div class="section-title">Certifications</div>
      <ul class="cert-list">
        ${items}
      </ul>
    </section>`;
};

const buildProjectsSection = (projects: ResumeData["projects"]): string => {
  if (!projects?.length) return "";

  const entries = projects
    .map(
      ({ name, description, technologies, url }) => `
    <div class="entry">
      <div class="project-name">${
        url ? `<a href="${esc(url)}">${esc(name)}</a>` : esc(name)
      }</div>
      <div class="project-desc">${esc(description)}</div>
      <div class="project-tech">${technologies.map(esc).join(", ")}</div>
    </div>`
    )
    .join("\n");

  return `
    <section class="section" id="projects">
      <div class="section-title">Projects</div>
      ${entries}
    </section>`;
};

// ─── main export ─────────────────────────────────────────────────────────────

/**
 * Reads `resume.template.html`, replaces all `{{PLACEHOLDER}}` tokens with
 * data from `resumeData`, and returns the final HTML string.
 *
 * @param resumeData - Structured resume data from `ai.service.tailorResume()`
 * @returns Populated HTML string ready to be passed to `pdf.service`
 */
const buildResumeHtml = (resumeData: ResumeData): string => {
  const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  const html = template
    // ── Header ──────────────────────────────────────────────────
    .replace(/\{\{NAME\}\}/g, esc(resumeData.name))
    .replace("{{TAGLINE}}",   buildTagline(resumeData.skills))
    .replace("{{EMAIL}}",     esc(resumeData.email))
    .replace("{{PHONE}}",     esc(resumeData.phone))
    .replace("{{LOCATION}}",  esc(resumeData.location))
    .replace("{{LINKS_ROW}}", buildLinksRow(resumeData))
    // ── Sections ─────────────────────────────────────────────────
    .replace("{{SUMMARY}}",            esc(resumeData.summary))
    .replace("{{EXPERIENCE_ENTRIES}}", buildExperienceEntries(resumeData.experience))
    .replace("{{EDUCATION_ENTRIES}}",  buildEducationEntries(resumeData.education))
    .replace("{{SKILLS_ITEMS}}",       buildSkillItems(resumeData.skills))
    .replace("{{CERTIFICATIONS_SECTION}}", buildCertificationsSection(resumeData.certifications))
    .replace("{{PROJECTS_SECTION}}",   buildProjectsSection(resumeData.projects));

  return html;
};

export { buildResumeHtml };
