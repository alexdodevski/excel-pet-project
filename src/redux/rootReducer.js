import { CHANGE_TEXT, TABLE_RESIZE } from "./types";

// Pure Function
export function rootReducer(state, action) {
  let currState;
  let field;
  console.log("Action:", action);
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === "col" ? "colState" : "rowState";
      currState = state[field] || {};
      currState[action.data.id] = action.data.value;
      return { ...state, [field]: currState };

    case CHANGE_TEXT:
      currState = state["dataState"] || {};
      currState[action.data.id] = action.data.value;
      return { ...state, currentText: action.data.value, dataState: currState };

    default:
      return state;
  }
}
