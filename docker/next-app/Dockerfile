FROM node:16

RUN YARN_CHECKSUM_BEHAVIOR=update yarn

COPY --chown=node:node apps/next-app /srv/wrokspace/apps/next-app

WORKDIR /srv/wrokspace/apps/next-app

RUN YARN_CHECKSUM_BEHAVIOR=update yarn

RUN yarn next telemetry disable && \ 
  yarn build

CMD ["yarn", "start"]