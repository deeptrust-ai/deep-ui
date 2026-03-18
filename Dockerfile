# Build stage: install deps and build Storybook
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build-storybook

# Serve stage: lightweight static file server
FROM node:20-alpine

RUN npm install -g http-server@14

COPY --from=builder /app/storybook-static /app/storybook-static

WORKDIR /app

CMD ["sh", "-c", "http-server storybook-static -p ${PORT:-3000}"]
