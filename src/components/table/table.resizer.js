import { DOMutils } from "../../core/dom.utils";

const scrollHeight = Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.offsetHeight,
  document.body.clientHeight,
  document.documentElement.clientHeight
);

const minWidth = 40;
const minHeight = 24;

export function resizer($table, $resizer) {
  const resizeType = $resizer.dataset;

  resizeType.resize === "col"
    ? columnResize($resizer, $table)
    : rowResize($resizer);
}

function columnResize($resizer, $table) {
  let value;
  const $columnHeader = $resizer.closest('[data-type="resizeble"]');
  const columnCoords = DOMutils.getCoords($columnHeader);
  const idCol = $columnHeader.dataset.col;

  const $column = $table.querySelectorAll(`[data-col='${idCol}']`);
  $resizer.style.height = scrollHeight + "px";
  $resizer.style.zIndex = 1000;

  const moveColumnAt = (e) => {
    const delta = e.clientX - columnCoords.left - $columnHeader.clientWidth;
    value = columnCoords.width + delta;
    $resizer.style.left = value - $resizer.clientWidth + "px";
  };

  document.addEventListener("mousemove", moveColumnAt);
  document.onmouseup = () => {
    value < minWidth ? (value = minWidth) : value;

    $resizer.style.left = value - $resizer.offsetWidth + "px";
    $resizer.style.zIndex = 100;
    $resizer.style.height = $columnHeader.offsetHeight + "px";
    $column.forEach((cell) => (cell.style.width = value + "px"));
    document.removeEventListener("mousemove", moveColumnAt);
    document.onmouseup = null;
  };
}

function rowResize($resizer) {
  let value;
  const $row = $resizer.closest('[data-type="resizeble"]');
  const rowCoords = DOMutils.getCoords($row);

  $resizer.style.width = $row.offsetWidth + "px";
  $resizer.style.zIndex = 1000;

  const moveRowAt = (e) => {
    const delta = e.clientY - rowCoords.top - $row.clientHeight;
    value = rowCoords.height + delta;
    $resizer.style.top = value - $resizer.clientHeight + "px";
  };

  document.addEventListener("mousemove", moveRowAt);
  document.onmouseup = () => {
    value < minHeight ? (value = minHeight) : value;

    $resizer.style.top = value - $resizer.offsetHeight + "px";
    $resizer.style.zIndex = 100;
    $resizer.style.width = minWidth + "px";

    $row.style.height = value + "px";
    document.removeEventListener("mousemove", moveRowAt);
    document.onmouseup = null;
  };
}
