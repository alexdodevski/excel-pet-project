import { Page } from "../core/Page";
import { createStore } from "../core/store/createStore";
import { debounce, storage } from "../core/utils";
import { Excel } from "../components/excel/Excel";
import { Header } from "../components/header/Header";
import { Toolbar } from "../components/toolbar/Toolbar";
import { Formula } from "../components/formula/Formula";
import { Table } from "../components/table/Table";
import { rootReducer } from "../redux/rootReducer";
import { normalizeState } from "../redux/initialState";
import { ActiveRoute } from "../core/router/ActiveRoute";

function storageName(param) {
  return "excel:" + param;
}

export class ExcelPage extends Page {
  getRoot() {
    if (!this.params) {
      this.params = Date.now().toString();
      ActiveRoute.navigate(`#excel/${this.params}`);
    }

    const params = storageName(this.params);
    const state = storage(params);
    const store = createStore(rootReducer, normalizeState(state));

    const stateListener = debounce((state) => {
      storage(params, state);
    }, 200);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }
  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
  }
}
