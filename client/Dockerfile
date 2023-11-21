FROM node:18-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

RUN mkdir /usr/share/nginx/buffer

COPY --from=builder /app/dist /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir /usr/share/nginx/log

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]