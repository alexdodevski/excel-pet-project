import { initinalState } from "../redux/initialState";
import { rootReducer } from "../redux/rootReducer";

export class ExcelStore {
  constructor(rootReducer, initalState = {}) {
    this.initalState = initalState;
    this.rootReducer = rootReducer;
    this.listeners = new Set();
    this.state = this.rootReducer({ ...initalState }, { type: "__INIT__" });
  }
  subscribe(fn) {
    this.listeners.add(fn);
  }
  dispatch(action) {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach((listener) => listener(this.state));
  }
  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  unsubscribe() {
    this.listeners.clear();
  }
}

export function createStore() {
  return new ExcelStore(rootReducer, initinalState);
}
