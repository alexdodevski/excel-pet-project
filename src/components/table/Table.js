import ExcelComponent from "@core/ExcelComponent";
import { DOMutility } from "../../core/dom.utility";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root) {
    super($root, {
      name: "Table",
      listeners: ["mousedown"],
    });
  }

  toHTML() {
    return createTable(100);
  }

  onMousedown(e) {
    e.preventDefault();
    const $resizer = e.target;
    const elemAtrr = $resizer.dataset;

    if (elemAtrr.resize === "col") {
      let delta;
      let value;
      const $columnHeader = $resizer.closest('[data-type="resizeble"]');
      const columnCoords = DOMutility.getCoords($columnHeader);
      const colType = $columnHeader.dataset.col;

      const $column = this.$root.querySelectorAll(`[data-col='${colType}']`);

      const columnResize = (e) => {
        delta = e.clientX - columnCoords.right;
        value = columnCoords.width + delta;
        $resizer.style.left = value - $resizer.clientWidth + "px";
      };

      document.addEventListener("mousemove", columnResize);

      document.onmouseup = () => {
        if (e.clientX < columnCoords.left) {
          value = 24;
          $resizer.style.left = columnCoords.right + "px";
        }

        $column.forEach((cell) => (cell.style.width = value + "px"));
        document.removeEventListener("mousemove", columnResize);

        document.onmouseup = null;
      };
    } else if (elemAtrr.resize === "row") {
      let delta;
      let value;
      const $row = $resizer.closest('[data-type="resizeble"]');
      const rowCoords = DOMutility.getCoords($row);
      const rowResize = (e) => {
        delta = e.clientY - rowCoords.bottom;
        value = rowCoords.height + delta;
      };

      document.addEventListener("mousemove", rowResize);

      document.onmouseup = () => {
        if (value < rowCoords.top) {
          value = 24;
        }

        $row.style.height = value + "px";
        document.removeEventListener("mousemove", rowResize);
        document.onmouseup = null;
      };
    }
  }
}
