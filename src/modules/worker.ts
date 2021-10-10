import ConfigHandler from "../utils/config-handler";
import Bootable from "../utils/bootable";

export default class Worker implements Bootable {

  config: ConfigHandler;
  logger;

  async boot(){
    const {logLevel} = this.config.contents;
    this.logger.info("Entrypoint Worker started with log level " + logLevel);
  }
  
}
