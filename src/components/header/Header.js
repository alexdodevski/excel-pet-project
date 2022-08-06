import ExcelComponent from "@core/ExcelComponent";

export class Header extends ExcelComponent {
  static className = "excel__header";
  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: [],
      ...options,
    });
  }

  init() {
    super.init();
  }

  destroy() {
    super.destroy();
    this.unsubscribeOnEvent();
  }

  toHTML() {
    return `<input type="text" class="input" value="Новая таблица" />
          <div class="buttons">
            <div class="btn">
              <span class="material-icons"> delete </span>
            </div>
            <div class="btn">
              <span class="material-icons"> exit_to_app </span>
            </div>
          </div>`;
  }
}
