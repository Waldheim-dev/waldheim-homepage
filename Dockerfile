ARG PORT=8084

FROM node:23-alpine AS build

USER root


ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine AS production

HEALTHCHECK --interval=10s --timeout=3s \
  CMD curl -f http://localhost || exit 1

COPY --from=build /app/dist  /usr/share/nginx/html
EXPOSE ${PORT}