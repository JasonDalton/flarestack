FROM node:16-alpine as build

COPY package*json /tmp/

RUN cd /tmp && npm install && \
  mkdir -p /app \
  && cp -a /tmp/node_modules /app/


WORKDIR /app

COPY . /app

#COPY package*.json ./
#RUN npm ci
#COPY . .

ARG GENERATE_SOURCEMAP false
ARG REACT_APP_ENVIRONMENT production

RUN \
  export REACT_APP_ENVIRONMENT=$REACT_APP_ENVIRONMENT \
  && export GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP \
  && npm run build

ADD package.json /app/package.json
RUN cd /app && npm ci
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

FROM nginx

EXPOSE 80

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
