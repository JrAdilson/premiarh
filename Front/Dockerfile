FROM node:20-bullseye

ENV TZ=America/Sao_Paulo

WORKDIR /app

COPY package*.json ./
COPY quasar.config.js ./

RUN npm install -g @quasar/cli
RUN npm install

COPY . .

EXPOSE 8080

CMD ["quasar", "dev", "-H", "0.0.0.0"]