import ConfigHandler from "../utils/config-handler";
import Entrypoint from "./entrypoint";

import Koa from "koa";
import Router from "koa-router";

import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import favicon from 'koa-favicon';
import cors  from '@koa/cors';

import { Next, ParameterizedContext } from "koa";

import { RouteMapper } from "../utils/route-mapper";

export default class LiveReadinessApi implements Entrypoint {

  private config: ConfigHandler;

  name: string = "Live/Readiness API";

  setConfig(config: ConfigHandler){
    this.config = config;
  }

  async start(){
    return new Promise<any>((resolve, reject) => {
      const app = new Koa();
      const rootRouter = new Router();
      
      const PORT = this.config.contents.HEALTH_PORT || process.env.HEALTH_PORT || process.env.health_port || 3000;
      
      const routeMapper = new RouteMapper(rootRouter);
  
      routeMapper.addRouter("/health", "healthcheck");
      
      app
        .use(cors())
        .use(async (ctx: ParameterizedContext, next: Next) => {
          ctx.config = this.config.contents;
          await next();
        })
        .use(favicon())
        .use(json())
        .use(logger())
        .use(bodyParser())
        .use(rootRouter.routes())
        .use(rootRouter.allowedMethods())
      
      app.on('error', (e) => {
        console.log(">>>>>>> no reject");
        reject(e);
      });
      
      try {
        app.listen(PORT, () => {
          resolve(true);
        });  
      } catch (e) {
        console.log(">>>>>> no catch");
        reject(e);
      }
    });
  }
  
}
