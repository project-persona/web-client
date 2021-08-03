FROM node:lts-alpine

RUN apk add git

ADD ./ /app

RUN cd /app \
    && npm install \
    && npm run generate \
    apk del git

WORKDIR /app

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
