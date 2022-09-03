import ExcelComponent from "@core/ExcelComponent";
import { DOMutils } from "../../core/dom.utils";
import { isCell, nextSelect, shouldResize } from "./table.functions";
import { resizer } from "./table.resizer";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";
import * as action from "../../redux/actions.js";
import { defaultStyles } from "../../constans";

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
    return createTable(this.#ROWS, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection(this.$root);
    this.subscribeEvents();
  }

  init() {
    super.init();
    const $firstCell = this.$root.querySelector("[data-id='0:0']");
    this.selection.select($firstCell);

    this.giveCellText($firstCell, "table:select");
  }

  subscribeEvents() {
    this.subscribeOnEvent("formula:input", (text) => {
      DOMutils.attr(this.selection.current, "data-value", text);
      const parsedText = DOMutils.parseCell(text);
      DOMutils.changeText(this.selection.current, parsedText);
      this.updateStoreText(text);
    });
    this.subscribeOnEvent("formula:done", () => this.selection.select());
    this.subscribeOnEvent("toolbar:applyStyle", (value) => {
      this.selection.applyStyle(value);
      this.dispatch(
        action.apllyStyle({ value, ids: this.selection.selectedIds })
      );
    });
  }

  giveCellText($cell, event) {
    const text = $cell.dataset.value;
    this.emitEvent(event, text);
  }

  async resizeTable($target) {
    try {
      const data = await resizer(this.$root, $target);
      this.dispatch(action.tableResize(data));
    } catch (error) {
      console.log(error);
    }
  }

  onMousedown(event) {
    const $target = event.target;

    if (shouldResize($target)) {
      event.preventDefault();
      this.resizeTable($target);
    } else if (isCell($target)) {
      if (event.shiftKey) {
        this.selection.selectGroup($target);
      } else {
        this.selection.select($target);
        this.giveCellText(this.selection.current, "table:select");

        const styles = DOMutils.getStyles(Object.keys(defaultStyles), $target);
        this.dispatch(action.changeStyles(styles));
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
      const $next = this.$root.querySelector(
        nextSelect(key, id, this.#ROWS - 1)
      );
      this.selection.select($next);
      this.giveCellText($next, "table:select");
    }
  }

  updateStoreText(value) {
    this.dispatch(
      action.changeText({
        id: this.selection.current.dataset.id,
        value,
      })
    );
  }

  onInput(event) {
    const $target = event.target;
    this.updateStoreText(DOMutils.getText($target));
  }
}
