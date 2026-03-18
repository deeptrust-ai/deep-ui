# Build stage: install deps and build Storybook
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build-storybook

# Serve stage: minimal static file server (no URL rewriting)
FROM node:20-alpine

COPY --from=builder /app/storybook-static /app/storybook-static
COPY server.cjs /app/server.cjs

WORKDIR /app

CMD ["node", "server.cjs"]
