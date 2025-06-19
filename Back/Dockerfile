FROM node:20-alpine

ENV TZ=America/Sao_Paulo
RUN mkdir -p /home/node/dass-api

WORKDIR /home/node/dass-api

COPY ./package.json ./
COPY ./src ./src

RUN chown -R node:node /home/node/dass-api
USER node

RUN npm install \
    && npm audit fix --force \
    && npm ci

EXPOSE 3000

CMD [ "node", "./src/index.js" ]