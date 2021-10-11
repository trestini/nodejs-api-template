import { createLogger } from "bunyan";
import ConfigHandler from "../utils/config-handler";
import { ifThenElse } from "../utils/f";

const {ENV, NODE_ENV} = process.env;
const isProd = (NODE_ENV === "production" || ENV === "production");

type LoggerObj = {
  debug, info, warn, error
}
export default class Logger {

  config: ConfigHandler
  logger: LoggerObj

  constructor(){
    this.logger = ifThenElse(isProd,
      () => (createLogger({name: 'Default'})),
      () => console
    );
  }

  debug(msg){
    this.logger.debug(msg);
  }

  info(msg){
    this.logger.info(msg);
  }

  warn(msg){
    this.logger.warn(msg);
  }

  error(msg){
    this.logger.error(msg);
  }

}
