import ExcelComponent from "@core/ExcelComponent";
import { resizer } from "./table.resizer";
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
    return createTable(34);
  }

  onMousedown(e) {
    const resize = e.target.dataset.resize;
    if (resize) {
      resizer(this.$root, e);
    }
  }
}
