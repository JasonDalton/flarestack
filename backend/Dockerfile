# syntax=docker/dockerfile:1
FROM node:16-alpine AS builder

WORKDIR /app


COPY package*json /tmp/

RUN \
  cd /tmp && npm install \
  && mkdir -p /app \
  && cp -a /tmp/node_modules /app/

WORKDIR /app

COPY . .

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/node_modules /app/

ENV NODE_ENV=production

EXPOSE 3001

ENTRYPOINT npm run db:create

CMD ["node", "dist/server.js"]
