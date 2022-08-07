import { DOMutils } from "../../core/dom.utils";
import { Emitter } from "../../core/Emitter";

export class Excel {
  static className = "excel";

  constructor(selector, options) {
    this.$app = document.querySelector(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  initComponent(Component) {
    const componentOptions = {
      emitter: this.emitter,
    };

    const $rootComponent = DOMutils.create("div", Component.className);
    const component = new Component($rootComponent, componentOptions);

    DOMutils.addHTML($rootComponent, component.toHTML());
    component.prepare();
    this.$excel.append($rootComponent);

    return component;
  }

  createExcel() {
    this.$excel = DOMutils.create("div", Excel.className);

    this.components = this.components.map((Component) =>
      this.initComponent(Component)
    );
  }

  render() {
    this.createExcel();
    this.$app.append(this.$excel);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
