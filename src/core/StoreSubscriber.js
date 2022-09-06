import { isEqual } from "./utils";

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.components = null;
    this.currState = {};
  }

  setComponents(components) {
    this.components = components;
  }

  subComponents() {
    this.currState = this.store.getState();

    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.currState[key], state[key])) {
          this.components.forEach((component) => {
            if (component.isWatching(key)) {
              const changes = { [key]: state[key] };
              component.storeChanged(changes);
            }
          });
        }
      });
      this.currState = this.store.getState();

      if (process.env.NODE_ENV === "development") {
        window["redux"] = this.currState;
      }
    });
  }
  unsubFromStore() {
    this.store.unsubscribe();
  }
}
