FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_PROD=true
ARG VITE_WEB_SOCKET_URL=https://api-ceramic.churma.codes
ARG VITE_BACKEND_URL_PROD=https://api-ceramic.churma.codes/api
ARG VITE_BACKEND_STORAGE_URL_PROD=https://api-ceramic.churma.codes/uploads
ARG VITE_MIDTRANS_CLIENT_KEY=Mid-client-ChK9lMlGzdpmVUWF
ARG VITE_MIDTRANS_SNAP_URL=https://app.sandbox.midtrans.com/snap/snap.js

ENV VITE_PROD=$VITE_PROD \
    VITE_WEB_SOCKET_URL=$VITE_WEB_SOCKET_URL \
    VITE_BACKEND_URL_PROD=$VITE_BACKEND_URL_PROD \
    VITE_BACKEND_STORAGE_URL_PROD=$VITE_BACKEND_STORAGE_URL_PROD \
    VITE_MIDTRANS_CLIENT_KEY=$VITE_MIDTRANS_CLIENT_KEY \
    VITE_MIDTRANS_SNAP_URL=$VITE_MIDTRANS_SNAP_URL

RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
