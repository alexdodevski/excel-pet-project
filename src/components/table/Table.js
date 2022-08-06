import ExcelComponent from "@core/ExcelComponent";
import { DOMutils } from "../../core/dom.utils";
import { isCell, nextSelect, shouldResize } from "./table.functions";
import { resizer } from "./table.resizer";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
  static className = "excel__table";
  #ROWS = 34;
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }

  toHTML() {
    return createTable(this.#ROWS);
  }

  prepare() {
    this.selection = new TableSelection(this.$root);
  }

  init() {
    super.init();
    const $firstCell = this.$root.querySelector("[data-id='0:0']");
    this.selection.select($firstCell);

    this.giveCellText($firstCell, "table:select");
    this.subscribeOnEvent("formula:input", this.selection.changeSelectText);
    this.subscribeOnEvent("formula:done", this.selection.select);
  }

  destroy() {
    super.destroy();
    this.unsubscribeOnEvent();
  }

  giveCellText($cell, event) {
    const text = DOMutils.getText($cell);
    this.emitEvent(event, text);
  }

  onMousedown(event) {
    const $target = event.target;

    if (shouldResize($target)) {
      event.preventDefault();
      resizer(this.$root, $target);
    } else if (isCell($target)) {
      if (event.shiftKey) {
        this.selection.selectGroup($target);
      } else {
        this.selection.select($target);
        this.giveCellText(this.selection.current, "table:select");
      }
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = DOMutils.getCellId(this.selection.current);
      const $next = this.$root.querySelector(nextSelect(key, id));
      this.selection.select($next);
      this.giveCellText($next, "table:select");
    }
  }

  onInput(event) {
    const $target = event.target;

    if (isCell($target)) {
      this.giveCellText(this.selection.current, "table:input");
    }
  }
}
