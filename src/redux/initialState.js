import { storage } from "../core/utils.js";

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: "",
};

export const initinalState = storage("excel-state")
  ? storage("excel-state")
  : defaultState;
