FROM node:lts-alpine3.10

WORKDIR /todo-talks-api

COPY package*.json /todo-talks-api/

RUN npm install --production

COPY . /todo-talks-api/

ENTRYPOINT [ "node", "server.js" ]