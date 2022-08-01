import DomListener from "./DomListener";

export default class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;

    this.prepare();
  }
  toHTML() {
    return ``;
  }

  prepare() {}

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
