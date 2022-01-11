FROM node:16 as build

WORKDIR /app

COPY . .

RUN yarn install --frozen-lock \
  && yarn build

RUN rm -rf node_modules \
  && yarn install --production \
  && mv node_modules /app/dist

FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/dist /app

EXPOSE 8080

CMD [ "node", "server.js" ]
