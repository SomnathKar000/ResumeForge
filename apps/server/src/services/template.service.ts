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

/** Renders a single optional link item separated by a bullet. */
const optionalLink = (value: string | undefined, href: string): string =>
  value ? ` &nbsp;&bull;&nbsp; <a href="${href}">${esc(value)}</a>` : "";

/** Builds the combined optional-links string (LinkedIn · GitHub · Portfolio). */
const buildLinksRow = (data: ResumeData): string => {
  const parts = [
    data.linkedin  ? optionalLink(data.linkedin,  data.linkedin)  : "",
    data.github    ? optionalLink(data.github,     data.github)    : "",
    data.portfolio ? optionalLink(data.portfolio,  data.portfolio) : "",
  ].filter(Boolean);
  return parts.join("");
};

// ─── section builders ────────────────────────────────────────────────────────

const buildSkillsRows = (skills: ResumeData["skills"]): string =>
  skills
    .map(
      ({ category, items }) => `
    <div class="skill-row">
      <span class="skill-category">${esc(category)}:</span>
      <span class="skill-items">${items.map(esc).join(", ")}</span>
    </div>`
    )
    .join("\n");

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
          <div class="entry-subtitle">${esc(company)} &mdash; ${esc(location)}</div>
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
          <div class="entry-subtitle">${esc(institution)} &mdash; ${esc(location)}</div>
          ${gpa ? `<div class="entry-subtitle">GPA: ${esc(gpa)}</div>` : ""}
        </div>
        <div class="entry-date">${esc(graduationDate)}</div>
      </div>
    </div>`
    )
    .join("\n");

const buildCertificationsSection = (
  certifications: ResumeData["certifications"]
): string => {
  if (!certifications?.length) return "";

  const entries = certifications
    .map(
      ({ name, issuer, date }) => `
    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <div class="entry-title">${esc(name)}</div>
          <div class="entry-subtitle">${esc(issuer)}</div>
        </div>
        <div class="entry-date">${esc(date)}</div>
      </div>
    </div>`
    )
    .join("\n");

  return `
    <section class="section" id="certifications">
      <div class="section-title">Certifications</div>
      ${entries}
    </section>`;
};

const buildProjectsSection = (
  projects: ResumeData["projects"]
): string => {
  if (!projects?.length) return "";

  const entries = projects
    .map(
      ({ name, description, technologies, url }) => `
    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <div class="project-name">${
            url
              ? `<a href="${esc(url)}">${esc(name)}</a>`
              : esc(name)
          }</div>
          <div>${esc(description)}</div>
          <div class="project-tech">${technologies.map(esc).join(", ")}</div>
        </div>
      </div>
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
    // ── Contact header ──────────────────────────────────────────
    .replace(/\{\{NAME\}\}/g, esc(resumeData.name))
    .replace("{{EMAIL}}",    esc(resumeData.email))
    .replace("{{PHONE}}",    esc(resumeData.phone))
    .replace("{{LOCATION}}", esc(resumeData.location))
    .replace("{{LINKS_ROW}}", buildLinksRow(resumeData))
    // ── Sections ─────────────────────────────────────────────────
    .replace("{{SUMMARY}}", esc(resumeData.summary))
    .replace("{{SKILLS_ROWS}}", buildSkillsRows(resumeData.skills))
    .replace(
      "{{EXPERIENCE_ENTRIES}}",
      buildExperienceEntries(resumeData.experience)
    )
    .replace(
      "{{EDUCATION_ENTRIES}}",
      buildEducationEntries(resumeData.education)
    )
    .replace(
      "{{CERTIFICATIONS_SECTION}}",
      buildCertificationsSection(resumeData.certifications)
    )
    .replace(
      "{{PROJECTS_SECTION}}",
      buildProjectsSection(resumeData.projects)
    );

  return html;
};

export { buildResumeHtml };
