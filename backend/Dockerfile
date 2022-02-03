FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine as staging

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn install --production


FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=staging /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/dist /usr/src/app

EXPOSE 8080
CMD [ "node", "server.js" ]
