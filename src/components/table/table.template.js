const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(row, state) {
  return function (_, col) {
    const width = getWidth(state, col);
    return `<div class="cell" 
            contenteditable="" 
            data-col='${col}' 
            data-id='${row}:${col}'
            data-row ='${row + 1}'
            style="width:${width}"></div>`;
  };
}

function toColumn({ col, index, width }) {
  return `<div class="column" data-type="resizeble" style="width:${width}" 
   data-col='${index}'>${col} 
          <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function getWidth(state, index) {
  if (state[index]) return state[index] + "px";
  return DEFAULT_WIDTH + "px";
}

function getHeight(state, index) {
  if (state[index]) return state[index] + "px";
  return DEFAULT_HEIGHT + "px";
}

function createRow(index, content, state = {}) {
  const height = getHeight(state, index);
  const resizer = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : "";

  return `<div class="row"
          style="height:${height} 
          "data-id="${index}"  data-type="${index ? "resizeble" : ""}">
          <div class="row-info">${index ? index : ""}
          ${resizer}
          </div>
          <div class="row-data">${content}</div>
          </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function widthColumn(state) {
  return function (col, index) {
    return {
      col: col,
      index: index,
      width: getWidth(state, index),
    };
  };
}

export function createTable(rowsCount = 15, state) {
  const colState = state.colState;
  const rowState = state.rowState;
  console.log(rowState);
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(widthColumn(colState))
    .map(toColumn)
    .join("");

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(toCell(row, colState))
      .join("");
    console.log(rowState);
    rows.push(createRow(row + 1, cells, rowState));
  }

  return rows.join("");
}
