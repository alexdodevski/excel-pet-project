import { createStore, ExcelStore } from "./createStore";

const initalState = {
  count: 0,
};

const reducer = (state = initalState, action) => {
  if (action.type === "ADD") {
    return { ...state, count: ++state.count };
  }
  return state;
};

describe("createStore:", () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initalState);
    handler = jest.fn();
  });

  test("should return store object from ExcelStore class", () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.unsubscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();
    expect(store).toBeInstanceOf(ExcelStore);
  });

  test("should return object as a state", () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test("should return defaultState", () => {
    expect(store.getState()).toEqual(initalState);
  });

  test("should change state if actions exists", () => {
    store.dispatch({ type: "ADD" });
    expect(store.getState().count).toBe(1);
  });

  test("should NOT change state if actions dont exists", () => {
    store.dispatch({ type: "NOT_EXISTING_ACTION" });
    expect(store.getState().count).toBe(0);
  });

  test("should call subscriber function", () => {
    store.subscribe(handler);

    store.dispatch({ type: "ADD" });

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test("should not call sub if unsubscribe", () => {
    store.subscribe(handler);

    store.unsubscribe();

    store.dispatch({ type: "ADD" });

    expect(handler).not.toHaveBeenCalled();
  });

  test("should dispatch in async way", () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.dispatch({ type: "ADD" });
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});
