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

cp -r /unitydir/* /var/lib/docker/overlay2/ebc64f4f79cec81abf0171bcb0adf2423e616036a59d8a79dbbc3760f3c7d9e5/merged/usr/share/nginx/html/
