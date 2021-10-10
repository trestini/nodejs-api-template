export default interface Bootable {
  boot(): Promise<any>;
}
