"use strict";

import { Excel } from "@/components/excel/Excel";
import { Header } from "@/components/header/Header";
import { Formula } from "./components/formula/Formula";
import { Table } from "./components/table/Table";
import { Toolbar } from "./components/toolbar/Toolbar";
import { createStore } from "./core/createStore";
import { storage, debounce } from "./core/utils";
import "./sass/index.sass";

const store = createStore();

const stateListener = debounce((state) => {
  storage("excel-state", state);
}, 200);

store.subscribe(stateListener);

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
