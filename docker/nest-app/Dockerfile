FROM node:16

COPY --chown=node:node apps/nest-app /srv/wrokspace/apps/nest-app

WORKDIR /srv/wrokspace/apps/nest-app

RUN YARN_CHECKSUM_BEHAVIOR=update yarn || YARN_CHECKSUM_BEHAVIOR=update yarn || YARN_CHECKSUM_BEHAVIOR=update yarn

RUN yarn prisma generate && \ 
  yarn build

CMD ["yarn", "start:migrate:prod"]