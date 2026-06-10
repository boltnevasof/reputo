# ── build stage ────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
RUN npm run build

# ── serve stage: nginx with static + /api reverse proxy ────
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# nginx renders *.template files from /etc/nginx/templates with envsubst on start
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80 443
