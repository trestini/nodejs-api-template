import Koa from "koa";
import Router from "koa-router";

import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import favicon from 'koa-favicon';
import cors  from '@koa/cors';

import { Next, Context } from "koa";

import { RouteMapper } from "../utils/route-mapper";
import Bootable from "../utils/bootable";
import ConfigHandler from "../utils/config-handler";

export default class FeatureApi implements Bootable {

  config: ConfigHandler;

  async boot(){
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
        .use(async (ctx: Context, next: Next) => {
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
          console.log("Feature API listening on port", PORT);
          resolve(true);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  
}
