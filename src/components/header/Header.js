import ExcelComponent from "@core/ExcelComponent";
import { defaultTitle } from "../../constans";
import { ActiveRoute } from "../../core/router/ActiveRoute";
import { debounce, deleteStorage } from "../../core/utils";
import { changeTitle } from "../../redux/actions";

export class Header extends ExcelComponent {
  static className = "excel__header";
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "click"],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 100);
  }

  init() {
    super.init();
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `<input type="text" class="input" value="${title}" />
          <div class="buttons">
            <div class="btn" data-btn="remove">
              <span class="material-icons"> delete </span>
            </div>
            <div class="btn" data-btn="exit">
              <span class="material-icons"> exit_to_app </span>
            </div>
          </div>`;
  }

  onInput(e) {
    const $target = e.target;
    this.dispatch(changeTitle($target.value));
  }

  onClick(e) {
    const $target = e.target;

    if ($target.closest(".btn")) {
      const btn = $target.closest(".btn");

      if (btn.dataset.btn === "remove") {
        const decision = confirm("Вы действительно хотите удалить таблицу?");

        if (decision) {
          deleteStorage("excel:" + ActiveRoute.param);
          ActiveRoute.navigate("");
        }
      } else if (btn.dataset.btn === "exit") {
        ActiveRoute.navigate("");
      }
    }
  }
}
