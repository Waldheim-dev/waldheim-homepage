FROM registry.gitlab.com/mwaldheim/container/nx.dev:latest
ARG PORT=8082

USER root

RUN apk add --no-cache curl

HEALTHCHECK --interval=10s --timeout=5s \
  CMD curl -f http://localhost:$PORT/health || exit 1

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY . .

RUN npm i -f
RUN npm run build
EXPOSE $PORT

ENTRYPOINT npm run ssr:prod && node dist/server/main.js --port $PORT
