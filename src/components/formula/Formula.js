import ExcelComponent from "@core/ExcelComponent";
import { DOMutils } from "../../core/dom.utils";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
    });
  }

  init() {
    super.init();
    this.$input = this.$root.querySelector(".input");
    this.subscribeOnEvent(
      "table:select",
      DOMutils.changeText.bind(this, this.$input)
    );
    this.subscribeOnEvent(
      "table:input",
      DOMutils.changeText.bind(this, this.$input)
    );
  }

  destroy() {
    super.destroy();
    this.unsubscribeOnEvent();
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
