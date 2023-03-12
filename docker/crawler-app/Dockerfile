FROM node:16

RUN YARN_CHECKSUM_BEHAVIOR=update yarn

COPY --chown=node:node apps/crawler-app /srv/wrokspace/apps/crawler-app

WORKDIR /srv/wrokspace/apps/crawler-app

RUN YARN_CHECKSUM_BEHAVIOR=update yarn

CMD ["tail", "-f"]

# RUN yarn build

# CMD ["yarn", "start"]