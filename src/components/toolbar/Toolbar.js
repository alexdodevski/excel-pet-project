import ExcelComponent from "@core/ExcelComponent";

export class Toolbar extends ExcelComponent {
  static className = "excel__toolbar";
  constructor($root) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
    });
  }
  toHTML() {
    return `    <div class="btn">
            <span class="material-icons"> format_align_left </span>
          </div>
          <div class="btn">
            <span class="material-icons"> format_align_center </span>
          </div>
          <div class="btn">
            <span class="material-icons"> format_align_right </span>
          </div>
          <div class="btn">
            <span class="material-icons"> format_bold </span>
          </div>
          <div class="btn">
            <span class="material-icons"> format_italic </span>
          </div>
          <div class="btn">
            <span class="material-icons"> format_underlined </span>
          </div>`;
  }

  onClick(e) {}
}
