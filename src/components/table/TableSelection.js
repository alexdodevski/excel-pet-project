import { DOMutils } from "../../core/dom.utils";
import { range } from "./table.functions";

export class TableSelection {
  #CLASS_NAME = "selected";
  constructor($table) {
    this.group = [];
    this.$table = $table;
    this.current;
  }

  select($el = this.current) {
    this.clearSelect();
    this.group.push($el);
    this.current = $el;
    this.current.focus();
    DOMutils.addClass($el, this.#CLASS_NAME);
  }

  selectGroup($target) {
    this.clearSelect();
    this.group = this.getCells($target);
    this.group.forEach((cell) => DOMutils.addClass(cell, this.#CLASS_NAME));
  }

  get selectedIds() {
    return this.group.map(($el) => {
      return $el.dataset.id;
    });
  }

  clearSelect() {
    this.group.forEach((cell) => DOMutils.removeClass(cell, this.#CLASS_NAME));
    this.group = [];
  }

  getCells($el) {
    const currentId = DOMutils.getCellId(this.current);
    const targetId = DOMutils.getCellId($el);

    const cols = range(currentId.col, targetId.col);
    const rows = range(currentId.row, targetId.row);

    const ids = rows.reduce((acc, row) => {
      cols.forEach((col) => acc.push(`${row}:${col}`));
      return acc;
    }, []);

    const $cells = ids.map((id) =>
      this.$table.querySelector(`[data-id="${id}"]`)
    );

    return $cells;
  }

  applyStyle(style) {
    const [key, value] = Object.entries(style)[0];
    this.group.forEach(($el) => {
      $el.style[key] = `${value}`;
    });
  }
}
