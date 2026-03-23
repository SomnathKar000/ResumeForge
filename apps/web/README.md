# ResumeForge — Web

> The frontend for ResumeForge. Built with React + Tailwind CSS.

---

## What this does

This is the UI where the user:

1. Uploads their resume (PDF or DOCX)
2. Pastes the job description
3. Clicks generate
4. Downloads the tailored resume as PDF

---

## Tech

| Thing      | Tool               |
| ---------- | ------------------ |
| Framework  | React + TypeScript |
| Styling    | Tailwind CSS       |
| HTTP Calls | Axios              |
| Bundler    | Vite               |

---

## Folder Structure

```
web/
├── public/
├── src/
│   ├── assets/               # Images, icons
│   ├── components/
│   │   ├── ui/               # Reusable components (Button, Input, etc.)
│   │   ├── ResumeUploader.tsx  # File upload input
│   │   ├── JDInput.tsx         # Job description textarea
│   │   └── DownloadCard.tsx    # Shows download button after generation
│   ├── pages/
│   │   ├── Home.tsx            # Main page (upload + JD input)
│   │   └── Result.tsx          # Result page (download resume)
│   ├── services/
│   │   └── api.ts              # All API calls to backend
│   ├── hooks/
│   │   └── useResumeGen.ts     # Handles generation state + logic
│   ├── types/
│   │   └── index.ts            # Shared TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── .env
├── index.html
├── tailwind.config.ts
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
VITE_API_URL=http://localhost:4000
```

### 3. Start dev server

```bash
npm run dev
```

Runs on → `http://localhost:5173`

---

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```
