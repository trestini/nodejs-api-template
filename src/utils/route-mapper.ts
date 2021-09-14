import * as Router from "koa-router";

export class RouteMapper {
  
  constructor(private rootRouter: Router){}

  addRouter(path: string, feature: string) {
    const router = require(`../features/${feature}/router`);
    this.rootRouter.use(path, router);
  }

}
