FROM node:18.12.1-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .                                                                                                                                                                                                                                                     

RUN npm run build

FROM nginx

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/default.conf /etc/nginx/conf.d/
