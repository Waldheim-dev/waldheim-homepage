ARG PORT=8084

FROM registry.gitlab.com/mwaldheim/container/angular:latest as build

USER root

RUN apk add --no-cache curl


ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY . .

RUN pnpm i
RUN pnpm run build

FROM nginx:latest as production

HEALTHCHECK --interval=10s --timeout=3s \
  CMD curl -f http://localhost || exit 1

COPY --from=build /opt/app/dist  /usr/share/nginx/html
EXPOSE ${PORT}