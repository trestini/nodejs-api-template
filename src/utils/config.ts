import { Next, ParameterizedContext } from "koa";
import * as fs from 'fs';

let CONFIG = {};

const configPath = process.env.NODE_ENV === 'development'
  ? './config/config.json'
  : '/config/config.json';

console.log("config path set to ", configPath);

if( fs.existsSync(configPath) ){
  reload();
  console.log("watching changes in ", configPath)
  fs.watchFile(configPath, { interval: 10000}, (curr, prev) => {
    reload();
  });
} else {
  console.warn("config file not exists");
}

function reload(){
  const contents = fs.readFileSync(configPath, 'utf-8');
  CONFIG = JSON.parse(contents);
}

export async function middleware(ctx: ParameterizedContext, next: Next) {
  ctx.config = CONFIG;
  await next();
};

export const config: any = CONFIG;
