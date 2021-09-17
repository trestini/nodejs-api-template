FROM node:16-alpine

WORKDIR /opt/app
COPY . .

### ENTRYPOINT/RUN
RUN yarn
RUN yarn build

CMD ["yarn", "start"]
