FROM node:lts-alpine as builder
WORKDIR /usr/share/homeport

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run production

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /usr/share/homeport/dist .

COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]