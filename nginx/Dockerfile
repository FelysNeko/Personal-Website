FROM nginx:latest

COPY ./templates /etc/nginx/templates

COPY felysneko.pem /etc/ssl/certs
COPY felysneko.key /etc/ssl/certs

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]