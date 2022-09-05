import { isEqual } from "./utils";

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.components = null;
    this.prevState = {};
  }

  setComponents(components) {
    this.components = components;
  }

  subComponents() {
    this.prevState = this.store.getState();

    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key])) {
          this.components.forEach((component) => {
            if (component.isWatching(key)) {
              const changes = { [key]: state[key] };
              component.storeChanged(changes);
            }
          });
        }
      });
      this.prevState = this.store.getState();

      if (process.env.NODE_ENV === "development") {
        window["redux"] = this.prevState;
      }
    });
  }
  unsubFromStore() {
    this.store.unsubscribe();
  }
}
