ARG BASE_IMAGE
FROM ${BASE_IMAGE}

COPY docker-entrypoint.sh /usr/local/bin/

RUN chmod 777 /usr/local/bin/docker-entrypoint.sh 

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["yarn", "dev"]