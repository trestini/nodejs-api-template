import ConfigHandler from "../utils/config-handler";

export default interface Entrypoint {
  name: string,
  setConfig(config: ConfigHandler): void,
  start(): Promise<any>;
}
