FROM node:16

COPY --chown=node:node libs/api /srv/wrokspace/libs/api

WORKDIR /srv/wrokspace/libs/api

RUN YARN_CHECKSUM_BEHAVIOR=update yarn

COPY --chown=node:node apps/crawler-app /srv/wrokspace/apps/crawler-app

WORKDIR /srv/wrokspace/apps/crawler-app

RUN YARN_CHECKSUM_BEHAVIOR=update yarn

CMD ["tail", "-f"]

# RUN yarn build

# CMD ["yarn", "start"]