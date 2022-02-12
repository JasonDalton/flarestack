# syntax=docker/dockerfile:1
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*json ./

RUN npm ci --silent

COPY . .

RUN npm run build

FROM node:16-alpine as staging

ENV NODE_ENV=production

WORKDIR /app

COPY package*json ./
RUN npm install --production --silent
COPY --from=builder /app/dist /app/dist

FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=staging /app /app

EXPOSE 8080

CMD ["node", "dist/server.js"]
