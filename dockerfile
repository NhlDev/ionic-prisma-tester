FROM nginx:alpine-slim

COPY ./www /usr/share/nginx/html

EXPOSE 80
