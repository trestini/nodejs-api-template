FROM node:15-alpine3.12

WORKDIR /opt/app
COPY . .

### ENTRYPOINT/RUN
RUN yarn
RUN yarn build

CMD ["yarn", "start"]
