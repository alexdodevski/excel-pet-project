export function createStore(rootReducer, initalState = {}) {
  let state = rootReducer({ ...initalState }, { type: "__INIT__" });
  const listeners = new Set();

  return {
    subscribe(fn) {
      listeners.add(fn);
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },

    unsubscribe(fn) {
      listeners.delete(fn);
    },
  };
}
