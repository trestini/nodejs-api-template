FROM node:15-alpine3.12

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .

RUN yarn
