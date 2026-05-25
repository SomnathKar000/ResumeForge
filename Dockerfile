# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy only server files
COPY apps/server/package*.json ./apps/server/

WORKDIR /app/apps/server

# Install dependencies
RUN npm install

# Copy server source
COPY apps/server/src ./src
COPY apps/server/tsconfig.json ./

# Build
RUN npm run build

# Runtime stage
FROM node:22-alpine

WORKDIR /app/apps/server

# Install Chromium dependencies
RUN apk add --no-cache chromium

ENV CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV NODE_ENV=production

# Copy built files
COPY --from=builder /app/apps/server/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./dist
COPY apps/server/package*.json ./

EXPOSE 8080

CMD ["npm", "start"]