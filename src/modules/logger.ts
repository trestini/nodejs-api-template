export default class Logger {

  private logLevel: number;

  set config(conf){
    const { logLevel } = conf.contents;
    this.logLevel = logLevel || 1;
    this.debug("Global config module registered in Logger class with logLevel " + logLevel);
  }

  debug(msg){
    this.logLevel < 1 && console.log("DEBUG", msg);
  }

  info(msg){
    this.logLevel < 2 && console.log("INFO", msg);
  }

  warn(msg){
    this.logLevel < 3 && console.warn("WARN", msg);
  }

  error(msg){
    this.logLevel < 4 && console.error("ERROR", msg);
  }

}
