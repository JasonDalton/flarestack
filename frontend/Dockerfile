FROM node:16-alpine as build
WORKDIR /app
COPY package*json ./
RUN npm ci --silent
COPY . .
RUN npm run build:production

#FROM node:16-alpine
#RUN npm install -g serve
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80

#CMD [ " serve","-s","build" ]
