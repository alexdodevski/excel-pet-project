import { Router } from "./Router";
import { Page } from "../Page";

class Sereja1 extends Page {
  getRoot() {
    const root = document.createElement("div");
    root.innerHTML = "dashboard";
    return root;
  }
}
class Sereja2 extends Page {}

describe("Router", () => {
  let router;

  beforeEach(() => {
    router = new Router("#app", {
      dashboard: Sereja1,
      excel: Sereja2,
    });
  });

  test("should be defined", () => {
    expect(router).toBeDefined();
  });

  test("should render <h1>Dashboard Page</h1>", () => {
    expect(router.$placeholder.innerHTML).toBe("<div>dashboard</div>");
  });
});
