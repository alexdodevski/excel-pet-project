import DomListener from "./DomListener";

export default class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.subs = {};
    this.store = options.store;
    this.subscribe = options.subscribe || "";
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
    this.unsubscribeFromEvents();
  }

  emitEvent(event, ...data) {
    this.emitter.emit(event, ...data);
  }

  storeChanged() {}

  subscribeOnEvent(event, fn) {
    this.subs[event] = fn;
    this.emitter.subscribe(event, fn);
  }

  unsubscribeFromEvents() {
    // eslint-disable-next-line guard-for-in
    for (const [event, fn] of Object.entries(this.subs)) {
      this.emitter.unsubscribe(event, fn);
    }
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }
}
