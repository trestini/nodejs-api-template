console.log(`>>>>>>>>>>> Starting application ${process.env.npm_package_name} ${process.env.npm_package_version}`);

const {ENV, NODE_ENV, CONFIG_PATH, CONFIG_RENEW} = process.env;

const isProd = (NODE_ENV === "production" || ENV === "production");
const configPath = CONFIG_PATH || (isProd ? "/config/config.json" : "./config/config.json");
const configRenew = CONFIG_RENEW || "10_000";

console.log(`-------------------------------------------
Runtime configuration:
NODE_ENV: ${NODE_ENV}
Is production environment: ${isProd}
Configuation path: ${configPath}
Configuration rewew ${configRenew}ms
-------------------------------------------`)

import ConfigHandler from './utils/config-handler';
const config = new ConfigHandler(configPath, parseInt(configRenew));

import cli from './cli-bootstrap';
cli(config);

import api from './api-bootstrap';
api(config);
