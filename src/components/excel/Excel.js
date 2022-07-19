import { DOMutility } from "../../core/dom.utility";

export class Excel {
  static className = "excel";
  constructor(selector, options) {
    this.$app = document.querySelector(selector);
    this.components = options.components || [];
  }

  initComponent(Component, root) {
    const $elComponent = DOMutility.create("div", Component.className);
    const component = new Component($elComponent);

    DOMutility.addHTML($elComponent, component.toHTML());
    root.append($elComponent);

    return component;
  }

  getRoot() {
    const $root = DOMutility.create("div", Excel.className);

    this.components = this.components.map((Component) =>
      this.initComponent(Component, $root)
    );

    return $root;
  }

  render() {
    this.$app.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }
}
