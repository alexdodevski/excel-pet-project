import { defaultStyles, defaultTitle } from "../constans.js";
import { cloneObj } from "../core/utils.js";

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: "",
  currentStyles: defaultStyles,
  stylesState: {},
  title: defaultTitle,
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});

export function normalizeState(state) {
  return state ? normalize(state) : cloneObj(defaultState);
}
