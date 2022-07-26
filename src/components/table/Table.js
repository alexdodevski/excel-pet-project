import ExcelComponent from "@core/ExcelComponent";
import { shouldResize } from "./table.functions";
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
    shouldResize(e) ? resizer(this.$root, e) : false;
  }
}
