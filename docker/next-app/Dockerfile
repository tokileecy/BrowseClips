FROM node:16

COPY --chown=node:node libs/api /srv/wrokspace/libs/api

WORKDIR /srv/wrokspace/libs/api

RUN YARN_CHECKSUM_BEHAVIOR=update yarn

COPY --chown=node:node apps/next-app /srv/wrokspace/apps/next-app

WORKDIR /srv/wrokspace/apps/next-app

RUN YARN_CHECKSUM_BEHAVIOR=update yarn

RUN yarn next telemetry disable && \ 
  yarn build

CMD ["yarn", "start"]