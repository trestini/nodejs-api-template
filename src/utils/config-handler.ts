import fs from "fs";

export default class ConfigHandler {
  private _contents: any;

  constructor(readonly configPath: string, readonly configRenew: number) {
    this.checkAndWatch();
  }

  private checkAndWatch() {
    if (fs.existsSync(this.configPath)) {
      this.reload();
      fs.watchFile(
        this.configPath,
        { interval: this.configRenew },
        (curr, prev) => {
          console.log("Config file modified. Realoding...");
          this.reload();
        }
      );
    } else {
      throw new Error(`Configuration file '${this.configPath}' not exists`);
    }
  }

  private reload() {
    this._contents = JSON.parse(fs.readFileSync(this.configPath, "utf-8"));
  }

  get contents(){
    return this._contents;
  }

}
