FROM node:lts-alpine as builder
WORKDIR /usr/share/hitech-market

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run production

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /usr/share/hitech-market/dist .

COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]