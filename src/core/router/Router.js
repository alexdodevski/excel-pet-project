import { DOMutils } from "../dom.utils";
import { ActiveRoute } from "./ActiveRoute";

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error("Selector is not provided in Router");
    }

    this.$placeholder =
      document.querySelector(selector) ||
      document.createElement("div", selector); // for test

    this.routes = routes;

    this.changePageHandler = this.changePageHandler.bind(this);
    this.page = null;
    this.init();
  }

  init() {
    window.addEventListener("hashchange", this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    DOMutils.clear(this.$placeholder);

    const Page = ActiveRoute.path.includes("excel")
      ? this.routes.excel
      : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);
    const $root = this.page.getRoot();

    this.$placeholder.append($root);
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener("hashchange", this.changePageHandler);
  }
}
