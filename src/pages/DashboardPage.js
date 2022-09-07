import { Page } from "@core/Page";
import { DOMutils } from "../core/dom.utils";
import { createRecordsTable } from "./dashboard.functions";

export class DashboardPage extends Page {
  getRoot() {
    console.log(this.params);
    const now = Date.now().toString();
    const db = DOMutils.create("div", "dashboard");
    DOMutils.addHTML(
      db,
      `
        <div class="dashboard__header">
          <h1>Excel Dashboard</h1>
        </div>
        <div class="dashboard__new">
          <div class="dashboard__view">
            <a href="#excel/${now}" class="dashboard__create">
              Новая<br />
              Таблица
            </a>
          </div>
        </div>
        <div class="dashboard__table dashboard__view">
          ${createRecordsTable()}
        </div>`
    );

    return db;
  }
}
