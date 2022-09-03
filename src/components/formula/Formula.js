import ExcelComponent from "@core/ExcelComponent";
import { DOMutils } from "../../core/dom.utils";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      subscribe: ["currentText"],
      ...options,
    });
  }

  prepare() {
    this.$input = this.$root.querySelector(".input");
    this.subscribeEvents();
  }

  storeChanged({ currentText }) {
    DOMutils.changeText(this.$input, currentText);
  }

  subscribeEvents() {
    this.subscribeOnEvent("table:select", (text) => {
      DOMutils.changeText(this.$input, text);
    });
  }

  toHTML() {
    return `
          <div class="info">fx</div>
          <div class="input" contenteditable="true" spellcheck="false"></div>`;
  }

  onInput() {
    const text = DOMutils.getText(this.$input);
    this.emitEvent("formula:input", text);
  }

  onKeydown(event) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.emitEvent("formula:done");
    }
  }
}
