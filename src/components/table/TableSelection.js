import { DOMutility } from "../../core/dom.utility";

export class TableSelection {
  #CLASS_NAME = "selected";
  constructor($table) {
    this.$table = $table;
    this.group = [];
  }

  select($el) {
    this.group.push($el);
    DOMutility.addClass($el, this.#CLASS_NAME);
  }

  selectGroup() {}
}
