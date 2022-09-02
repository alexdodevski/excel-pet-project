"use strict";

import { Excel } from "@/components/excel/Excel";
import { Header } from "@/components/header/Header";
import { Formula } from "./components/formula/Formula";
import { Table } from "./components/table/Table";
import { Toolbar } from "./components/toolbar/Toolbar";
import { createStore } from "./core/createStore";
import { storage, debounce } from "./core/utils";
import { initinalState } from "./redux/initialState";
import { rootReducer } from "./redux/rootReducer";
import "./sass/index.sass";

const store = createStore(rootReducer, initinalState);

const stateListeneer = debounce((state) => {
  storage("excel-state", state);
}, 200);

store.subscribe(stateListeneer);

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
