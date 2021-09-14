import { Next, ParameterizedContext } from "koa";

export default {

  async isLive(ctx: ParameterizedContext, next: Next) {
    ctx.status = 500;
    await next();
  },
  async isReady(ctx: ParameterizedContext, next: Next) {
    console.log(ctx.config);
    ctx.status = 200;
    await next();
  }

}
