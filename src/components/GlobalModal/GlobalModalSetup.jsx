export default class GlobalModalSetup {
  static globalModalHolder;

  static setGlobalModalHolder(globalModalHolder) {
    this.globalModalHolder = globalModalHolder;
  }

  static getGlobalModalHolder() {
    return this.globalModalHolder;
  }
}
