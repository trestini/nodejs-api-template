import Koa from "koa";
import Router from "koa-router";

import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import favicon from 'koa-favicon';

const cors = require('@koa/cors');

import { RouteMapper } from "./route-mapper";
import { middleware as config } from "./utils/config";

const app = new Koa();
const rootRouter = new Router();

const PORT = process.env.PORT || process.env.port || 3000;

const routeMapper = new RouteMapper(rootRouter);

routeMapper.addRouter("/health", "healthcheck");

app
  .use(cors())
  .use(config)
  .use(favicon())
  .use(json())
  .use(logger())
  .use(bodyParser())
  .use(rootRouter.routes())
  .use(rootRouter.allowedMethods())

app.on('error', (e) => {
  console.error("app error", e);
});

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}`)
});
