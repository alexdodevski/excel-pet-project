import { capitalize } from "./utils";

export default class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("no $root provided for DomListener");
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        throw new Error(
          `The method ${method} is not create in ${this.name || ""} component`
        );
      }

      this[method] = this[method].bind(this);

      this.$root.addEventListener(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      this.$root.removeEventListener(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}
