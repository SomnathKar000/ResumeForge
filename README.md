# ResumeForge 🔨

> Upload your resume, paste a job description — get a tailored, ATS-friendly resume ready to download.

---

## What is this?

ResumeForge is an AI-powered tool that takes your existing resume and a job description, and rewrites your resume to match that job. It highlights the right skills, uses the right keywords, and formats everything in a clean ATS-friendly layout.

---

## How it works

```bash
Upload Resume (PDF or DOCX)
        +
  Paste Job Description
        ↓
   Extract resume text
        ↓
  Gemini AI analyzes both
        ↓
  Rewrites resume to match the job
        ↓
  Download your new resume as PDF
```

---

## Tech Stack

| Part           | Tech                             |
| -------------- | -------------------------------- |
| Frontend       | React + Tailwind CSS             |
| Backend        | Node.js + Express                |
| File Upload    | Multer                           |
| Resume Parsing | pdf-parse (PDF) + mammoth (DOCX) |
| AI             | Google Gemini API                |
| PDF Export     | Puppeteer                        |

---

## Project Structure

```bash

ResumeForge/
├── apps/
│ ├── web/ # Frontend (React)
│ └── server/ # Backend (Express)
├── docs/ # Setup and architecture notes
├── .gitignore
├── README.md
└── package.json # Root monorepo config

```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/somnathkar000/ResumeForge.git
cd ResumeForge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in `apps/server/`:

```env
PORT=5000
GEMINI_API_KEY=your_api_key_here
```

Create a `.env` file in `apps/web/`:

```env
VITE_API_URL=http://localhost:4000
```

### 4. Run the project

```bash
# Start both frontend and backend
npm run dev
```

Frontend runs on → `http://localhost:5173`
Backend runs on → `http://localhost:4000`

---

## Features

- ✅ Upload resume in PDF or DOCX format
- ✅ Paste any job description
- ✅ AI rewrites your resume to match the job
- ✅ ATS-friendly formatting
- ✅ Download as PDF instantly

---

## Coming Soon

- 🔜 Multiple resume templates
- 🔜 Cover letter generation
- 🔜 Resume vs JD match score
- 🔜 Save history (past resumes + job descriptions)
- 🔜 Chrome extension to grab JD from LinkedIn

---

## Local Development

```bash
# Frontend only
cd apps/web && npm run dev

# Backend only
cd apps/server && npm run dev
```

---

Built by [Somnath Kar](https://github.com/SomnathKar000)
