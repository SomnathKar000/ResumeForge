# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app/apps/server

# Install all deps (including devDeps needed for tsc)
COPY apps/server/package*.json ./
RUN npm ci

# Copy source and compile
COPY apps/server/src ./src
COPY apps/server/tsconfig.json ./
RUN npm run build

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM node:22-alpine

WORKDIR /app/apps/server

# Chromium for Puppeteer
RUN apk add --no-cache chromium

ENV CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV NODE_ENV=production

# Install only production dependencies (no devDeps = smaller image)
COPY apps/server/package*.json ./
RUN npm ci --omit=dev

# Copy compiled output from builder
COPY --from=builder /app/apps/server/dist ./dist

EXPOSE 8080

CMD ["npm", "start"]