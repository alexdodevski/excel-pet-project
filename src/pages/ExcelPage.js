import { Page } from "../core/page/Page";
import { createStore } from "../core/store/createStore";
import { Excel } from "../components/excel/Excel";
import { Header } from "../components/header/Header";
import { Toolbar } from "../components/toolbar/Toolbar";
import { Formula } from "../components/formula/Formula";
import { Table } from "../components/table/Table";
import { rootReducer } from "../redux/rootReducer";
import { normalizeState } from "../redux/initialState";
import { ActiveRoute } from "../core/router/ActiveRoute";
import { StateProcessor } from "../core/page/StateProcessor";
import { LocalStorageClient } from "./LocalStorageClient";

export class ExcelPage extends Page {
  constructor(params) {
    super(params);
    this.store = null;
    this.localClient = new LocalStorageClient(this.params);
    this.processor = new StateProcessor(this.localClient);
  }

  async getRoot() {
    this.checkParams();

    const state = await this.processor.get();

    this.store = createStore(rootReducer, normalizeState(state));
    this.store.subscribe(this.processor.listen);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store: this.store,
    });

    return this.excel.getRoot();
  }

  checkParams() {
    if (!this.params) {
      this.params = Date.now().toString();
      ActiveRoute.navigate(`#excel/${this.params}`);
      this.localClient.key = this.params;
    }
  }

  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
    this.store.unsubscribe();
  }
}
