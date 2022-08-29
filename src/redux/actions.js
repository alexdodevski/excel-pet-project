import { COLUMN_RESIZE, ROW_RESIZE } from "./types";

// action creator
export function columnResize(data) {
  return {
    type: COLUMN_RESIZE,
    data: data,
  };
}

export function rowResize(data) {
  return {
    type: ROW_RESIZE,
    data: data,
  };
}
