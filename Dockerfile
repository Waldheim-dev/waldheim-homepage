ARG PORT=8084

FROM node:23-alpine AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

USER root


ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm run build

FROM nginx:alpine AS production

HEALTHCHECK --interval=10s --timeout=3s \
  CMD curl -f http://localhost || exit 1

COPY --from=build /app/dist  /usr/share/nginx/html
EXPOSE ${PORT}