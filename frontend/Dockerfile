# build environment
FROM node:16-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lock --silent
RUN yarn global add react-scripts@4.0.1 -g --silent
COPY . ./


ENV GENERATE_SOURCEMAP=false
RUN yarn build:production

COPY nginx nginx

FROM nginx:stable-alpine
COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



#FROM nginx:stable-alpine

#COPY --from=build /app/build /usr/share/nginx/html
#COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

#ENV GENERATE_SOURCEMAP=false
#ENV REACT_APP_ENVIRONMENT=production
#ENV NODE_ENV=production

