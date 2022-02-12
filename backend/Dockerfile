# syntax=docker/dockerfile:1
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*json /app/

RUN npm ci

COPY . .

#RUN npm run build
RUN node_modules/.bin/tsc

RUN mkdir -p dist/documentation \
  && cp src/documentation/openapi.json dist/documentation/openapi.json

FROM node:16-alpine AS staging

ENV NODE_ENV=production

WORKDIR /app

COPY package*json /app/

RUN npm install --production

FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=staging /app/node_modules /app/node_modules

EXPOSE 3001

CMD ["node", "dist/server.js"]
