import ExcelComponent from "@core/ExcelComponent";
import { defaultTitle } from "../../constans";
import { debounce } from "../../core/utils";
import { changeTitle } from "../../redux/actions";

export class Header extends ExcelComponent {
  static className = "excel__header";
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input"],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 100);
  }

  init() {
    super.init();
  }

  destroy() {
    super.destroy();
    this.unsubscribeOnEvent();
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `<input type="text" class="input" value="${title}" />
          <div class="buttons">
            <div class="btn">
              <span class="material-icons"> delete </span>
            </div>
            <div class="btn">
              <span class="material-icons"> exit_to_app </span>
            </div>
          </div>`;
  }

  onInput(e) {
    const $target = e.target;
    this.dispatch(changeTitle($target.value));
  }
}
