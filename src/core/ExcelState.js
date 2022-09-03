import ExcelComponent from "./ExcelComponent";

export class ExcelState extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }

  getTemplate() {
    return JSON.stringify(this.state, null, 2);
  }

  initState(state = {}) {
    this.state = { ...state };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.$root.innerHTML = this.getTemplate();
  }
}
