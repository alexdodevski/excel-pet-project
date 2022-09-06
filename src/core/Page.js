export class Page {
  constructor(params) {
    this.params = params;
  }
  getRoot() {
    throw new Error("Method should be implemented");
  }

  afterRender() {}

  destroy() {}
}
