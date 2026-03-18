# Build stage: install deps and build Storybook
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build-storybook

# Serve stage: nginx for reliable static file serving
FROM nginx:alpine

COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Configure nginx to listen on PORT (Railway sets this)
RUN printf 'server {\n\
    listen %s;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' '${PORT}' > /etc/nginx/templates/default.conf.template

EXPOSE 3000
