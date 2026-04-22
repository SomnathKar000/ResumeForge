# ResumeForge — Server

> The backend for ResumeForge. Built with Node.js + Express.

---

## What this does

This server handles everything behind the scenes:

1. Receives the uploaded resume file + job description
2. Extracts text from the resume (PDF or DOCX)
3. Sends the text + JD to Claude AI
4. Gets back ATS-optimized resume content
5. Injects it into an HTML template
6. Converts HTML to PDF and sends it back

---

## Tech

| Thing        | Tool                                       |
| ------------ | ------------------------------------------ |
| Framework    | Node.js + Express                          |
| Language     | TypeScript                                 |
| File Upload  | Multer                                     |
| PDF Parsing  | pdf-parse                                  |
| DOCX Parsing | mammoth                                    |
| AI           | Anthropic Claude API (`@anthropic-ai/sdk`) |
| PDF Export   | Puppeteer                                  |

---

## Folder Structure

```bash
server/
├── src/
│   ├── routes/
│   │   └── resume.route.ts       # POST /api/generate
│   │
│   ├── services/
│   │   ├── parse.service.ts      # Extract text from PDF / DOCX
│   │   ├── ai.service.ts         # Call AI API, get resume JSON
│   │   ├── template.service.ts   # Inject JSON data into HTML template
│   │   └── pdf.service.ts        # Convert HTML to PDF using Puppeteer
│   │
│   ├── templates/
│   │   └── resume.template.html  # ATS-friendly resume HTML layout
│   │
│   ├── prompts/
│   │   └── tailor.prompt.ts      # Claude system prompt + user prompt
│   │
│   ├── middlewares/
│   │   └── upload.middleware.ts  # Multer config (file size, type, etc.)
│   │
│   ├── utils/
│   │   └── logger.ts             # Simple request/error logger
│   │
│   ├── types/
│   │   └── index.ts              # Shared types (ResumeData, ParsedResume, etc.)
│   │
│   └── index.ts                  # Express app entry point
│
├── .env
├── tsconfig.json
└── package.json
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment variables

Create a `.env` file:

```env
PORT=5000
ANTHROPIC_API_KEY=your_api_key_here
```

Get your Claude API key → [console.anthropic.com](https://console.anthropic.com)

### 3. Start dev server

```bash
npm run dev
```

Runs on → `http://localhost:4000`

---

## Available Scripts

```bash
npm run dev        # Start with ts-node (hot reload)
npm run build      # Compile TypeScript to JS
npm run start      # Run compiled JS (production)
npm run lint       # Run ESLint
```

---

## API Endpoints

### `POST /api/generate`

Takes resume file + job description, returns a tailored PDF.

### Request

```bash
Content-Type: multipart/form-data

Fields:
  - resume: File (PDF or DOCX)
  - jobDescription: string
```

### Response

```bash
Content-Type: application/pdf

Returns the PDF file as a binary buffer
```

---

## Request Flow

```bash
POST /api/generate
  ↓
upload.middleware.ts     → multer handles file upload
  ↓
parse.service.ts         → extract raw text from PDF or DOCX
  ↓
claude.service.ts        → send text + JD to Claude → get JSON back
  ↓
template.service.ts      → inject JSON into resume.template.html
  ↓
pdf.service.ts           → puppeteer renders HTML → PDF buffer
  ↓
res.send(pdfBuffer)      → frontend receives and downloads the file
```

---

## Notes

- Max file size: **5MB**
- Supported formats: `.pdf`, `.docx`
- Claude model used: `claude-sonnet-4-20250514`
