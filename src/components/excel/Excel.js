import { DOMutility } from "../../core/dom.utility";

export class Excel {
  static className = "excel";

  constructor(selector, options) {
    this.$app = document.querySelector(selector);
    this.components = options.components || [];
  }

  initComponent(Component) {
    const $elComponent = DOMutility.create("div", Component.className);
    const component = new Component($elComponent);

    DOMutility.addHTML($elComponent, component.toHTML());
    this.$excel.append($elComponent);

    return component;
  }

  createExcel() {
    this.$excel = DOMutility.create("div", Excel.className);

    this.components = this.components.map((Component) =>
      this.initComponent(Component)
    );
  }

  render() {
    this.createExcel();
    this.$app.append(this.$excel);
    this.components.forEach((component) => component.init());
  }
}
