# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Install Chromium dependencies for Puppeteer
RUN apk add --no-cache \
  chromium \
  noto-sans

# Puppeteer will use the system Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps ./apps
COPY package*.json ./

# Cloud Run requires port 8080
EXPOSE 8080

CMD ["npm", "start", "--workspace=apps/server"]