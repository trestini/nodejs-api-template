import { Next, Context } from "koa";

export default {

  async isLive(ctx: Context, next: Next) {
    ctx.status = 500;
    await next();
  },
  async isReady(ctx: Context, next: Next) {
    console.log(ctx.config);
    ctx.status = 200;
    await next();
  }

}
