import ExcelComponent from "@core/ExcelComponent";
import { isCell, shouldResize } from "./table.functions";
import { resizer } from "./table.resizer";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";

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

  prepare() {
    this.selection = new TableSelection(this.$root);
  }

  init() {
    super.init();
    const $firstCell = this.$root.querySelector("[data-id='0:0']");
    this.selection.select($firstCell);
  }

  onMousedown(event) {
    const $target = event.target;
    if (shouldResize($target)) {
      event.preventDefault();
      resizer(this.$root, $target);
    } else if (isCell($target)) {
      event.shiftKey
        ? this.selection.selectGroup($target)
        : this.selection.select($target);
    }
  }
}
