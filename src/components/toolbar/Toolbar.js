import { defaultStyles } from "../../constans";
import { ExcelState } from "../../core/ExcelState";
import { createToolbar } from "./createToolbar";

export class Toolbar extends ExcelState {
  static className = "excel__toolbar";
  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
      subscribe: ["currentStyles"],
      ...options,
    });
  }

  init() {
    super.init();
  }

  prepare() {
    this.initState(defaultStyles);
  }

  getTemplate() {
    return createToolbar(this.state);
  }

  destroy() {
    super.destroy();
    this.unsubscribeOnEvent();
  }
  toHTML() {
    return this.getTemplate();
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(e) {
    const $target = e.target;
    if ($target.dataset.type === "button") {
      const value = JSON.parse($target.dataset.value);
      this.emitEvent("toolbar:applyStyle", value);

      // const key = Object.keys(value)[0];
      // this.setState({ [key]: value[key] });
    }
  }
}
