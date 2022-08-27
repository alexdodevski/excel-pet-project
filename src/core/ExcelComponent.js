import DomListener from "./DomListener";

export default class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.subs = {};
    this.store = options.store;
    this.storeSub = null;
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
    this.storeSub.unsubscribe();
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
      this.emitter.unsubscribe(event, fn);
    }
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

  subscribeStore(fn) {
    this.store.subscribe(fn);
    this.storeSub = fn;
  }

  unsubscribeStore() {
    this.store.unsubscribeStore(this.storeSub);
  }
}
