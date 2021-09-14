import ConfigHandler from "../utils/config-handler";
import Entrypoint from "./entrypoint";

export default class Worker implements Entrypoint {

  private config: ConfigHandler;

  name: string = "Worker";

  setConfig(config: ConfigHandler){
    this.config = config;
  }

  async start(){
    console.log("Entrypoint Worker started");
  }
  
}
