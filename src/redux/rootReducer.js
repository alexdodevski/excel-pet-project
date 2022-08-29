import { ROW_RESIZE, COLUMN_RESIZE } from "./types";

// Pure Function
export function rootReducer(state, action) {
  let colState;
  let rowState;
  switch (action.type) {
    case COLUMN_RESIZE:
      colState = state.colState || {};
      colState[action.data.id] = action.data.value;
      return { ...state, colState: colState };

    case ROW_RESIZE:
      rowState = state.rowState || {};
      rowState[action.data.id] = action.data.value;
      return { ...state, rowState: rowState };

    default:
      return state;
  }
}
