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

export default class AppRestApi implements Entrypoint {

  private config: ConfigHandler;

  name: string = "Application default API";

  setConfig(config: ConfigHandler){
    this.config = config;
  }

  async start(){
    return new Promise<any>((resolve, reject) => {
      const app = new Koa();
      const rootRouter = new Router();
      
      const PORT = this.config.contents.PORT || process.env.PORT || process.env.port || 3000;
      
      const routeMapper = new RouteMapper(rootRouter);
      
      this.config.contents.routes && this.config.contents.routes.forEach(route => {
        routeMapper.addRouter(route.path, route.name);
      });
      
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
        .use(rootRouter.allowedMethods());
      
      try {
        app.on('error', (e) => {
          reject(e);
        });
        
        const server = app.listen(PORT);
        server.on('error', (e) => {
          reject(e);
        });
        server.on('listening', () => {
          resolve(true);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  
}
