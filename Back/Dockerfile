FROM node:20-bullseye

ENV TZ=America/Sao_Paulo
RUN mkdir -p /home/node/premiarh-api

WORKDIR /home/node/premiarh-api

COPY ./package.json ./
COPY ./src ./src

RUN chown -R node:node /home/node/premiarh-api
USER node

RUN npm install \
    && npm audit fix --force \
    && npm ci

EXPOSE 3000

CMD [ "node", "./src/index.js" ]