import Koa from "koa";
import Router from "koa-router";

import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import favicon from 'koa-favicon';
import cors  from '@koa/cors';

import { Next, ParameterizedContext } from "koa";

import { RouteMapper } from "./utils/route-mapper";
import ConfigHandler from "./utils/config-handler";

export default function startup(config: ConfigHandler) {
  const app = new Koa();
  const rootRouter = new Router();
  
  const PORT = config.contents.PORT || process.env.PORT || process.env.port || 3000;
  
  const routeMapper = new RouteMapper(rootRouter);
  
  routeMapper.addRouter("/health", "healthcheck");

  config.contents.routes && config.contents.routes.forEach(route => {
    routeMapper.addRouter(route.path, route.name);
  });
  
  app
    .use(cors())
    .use(async (ctx: ParameterizedContext, next: Next) => {
      ctx.config = config.contents;
      await next();
    })
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
    console.log(`Started HTTP API module on port ${PORT}`)
  });
  
}
