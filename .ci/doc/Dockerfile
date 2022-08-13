FROM node:slim
USER root

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1


RUN apt-get update \
    && apt-get install -y git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package.json
RUN npm i version \
    && cp -r node_modules/* /usr/local/lib/node_modules
USER node
