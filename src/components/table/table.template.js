const CODES = {
  A: 65,
  Z: 90,
};

const DEFAUL_WIDTH = 120;

function toCell(row) {
  return function (_, col) {
    return `<div class="cell" 
            contenteditable="" 
            data-col='${col}' 
            data-id='${row}:${col}'></div>`;
  };
}

function toColumn(col, index, width) {
  return `<div class="column" data-type="resizeble" style="width:${width}" 
   data-col='${index}'>${col} 
          <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function getWidth(state, index) {
  return state[index] + "px" || DEFAUL_WIDTH + "px";
}

function createRow(index, content) {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";
  return `<div class="row" data-type="${index ? "resizeble" : ""}">
    <div class="row-info">${index ? index : ""}
    ${resizer}
    </div>
    <div class="row-data">${content}</div>
  </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state) {
  const colState = state.colState;
  console.log(colState);
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map((col, index) => {
      const width = getWidth(colState, index);
      return toColumn(col, index, width);
    })
    .join("");

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill("").map(toCell(row)).join("");
    rows.push(createRow(row + 1, cells));
  }

  return rows.join("");
}
