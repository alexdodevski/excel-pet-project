import { isEqual } from "../utils";

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.components = null;
    this.currState = {};
  }

  setComponents(components) {
    this.components = components;
  }

  subComponents() {
    this.currState = this.store.getState();

    this.store.subscribe((changeState) => {
      Object.keys(changeState).forEach((key) => {
        if (!isEqual(this.currState[key], changeState[key])) {
          this.components.forEach((component) => {
            if (component.isWatching(key)) {
              const changes = { [key]: changeState[key] };
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
