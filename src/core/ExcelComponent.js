import DomListener from "./DomListener";

export default class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.subs = {};
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

  emitEvent(event, ...data) {
    this.emitter.emit(event, ...data);
  }

  subscribeOnEvent(event, fn) {
    this.subs[event] = fn;
    this.emitter.subscribe(event, fn);
  }

  unsubscribeOnEvent() {
    // eslint-disable-next-line guard-for-in
    for (const [event, fn] of Object.entries(this.subs)) {
      console.log("from component", event, fn);
      this.emitter.unsubscribe(event, fn);
    }
  }
}
