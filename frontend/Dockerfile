FROM node:16-alpine as build
WORKDIR /app
COPY package*json ./
RUN npm ci --silent
COPY tsconfig.json /app/tsconfig.json
COPY public /app/public
COPY src /app/src
#COPY . .
RUN npm run build:production
#COPY nginx /app/nginx

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
