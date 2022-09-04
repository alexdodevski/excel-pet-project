import { defaultStyles } from "../../constans";
import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import { createToolbar } from "./createToolbar";

export class Toolbar extends ExcelStateComponent {
  static className = "excel__toolbar";
  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
      subscribe: ["currentStyles"],
      ...options,
    });
    this.initState(defaultStyles);
  }

  init() {
    super.init();
  }

  getTemplate() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.getTemplate();
  }

  storeChanged({ currentStyles }) {
    this.setState(currentStyles);
  }

  onClick(e) {
    const $target = e.target;
    if ($target.dataset.type === "button") {
      const value = JSON.parse($target.dataset.value);
      this.emitEvent("toolbar:applyStyle", value);
    }
  }
}
