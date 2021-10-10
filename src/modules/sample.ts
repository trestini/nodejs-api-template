import Bootable from "../utils/bootable";
import ConfigHandler from "../utils/config-handler";
import Logger from "./logger";

export default class SampleModule implements Bootable {

  logger: Logger;
  config: ConfigHandler;

  async boot(){
    return new Promise((r, j) => {
      setTimeout(() => {
        r(true);
      }, 2000);
    });
  }
}
