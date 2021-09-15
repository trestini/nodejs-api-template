console.log(`>>>>>>>>>>> Starting application ${process.env.npm_package_name} ${process.env.npm_package_version}`);

const {ENV, NODE_ENV, CONFIG_PATH, CONFIG_RENEW} = process.env;

const isProd = (NODE_ENV === "production" || ENV === "production");
const configPath = CONFIG_PATH || (isProd ? "/config/config.json" : "./config/config.json");
const configRenew = CONFIG_RENEW || "10_000";

console.log(`-------------------------------------------
Runtime configuration:
NODE_ENV: ${NODE_ENV}
Is production environment: ${isProd}
Configuration path: ${configPath}
Configuration rewew ${configRenew}ms
-------------------------------------------`)

import ConfigHandler from './utils/config-handler';
const config = new ConfigHandler(configPath, parseInt(configRenew));

import AppRestApi from './entrypoints/app-rest-api';
import LiveReadinessApi from './entrypoints/live-readiness-api';
import Worker from './entrypoints/worker';

[AppRestApi, LiveReadinessApi, Worker].forEach(async EntrypointClass => {
  const instance = new EntrypointClass();
  instance.setConfig(config);
  try {
    await instance.start();
    console.log(`[√] Module ${instance.name} started`);
  } catch (e) {
    console.log(`[X] Module ${instance.name} failed to start: ${e.message}`);
  }
});
