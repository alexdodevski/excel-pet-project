"use strict";

import { Excel } from "@/components/excel/Excel";
import { Header } from "@/components/header/Header";
import { Formula } from "./components/formula/Formula";
import { Table } from "./components/table/Table";
import { Toolbar } from "./components/toolbar/Toolbar";
import { createStore } from "./core/createStore";
import { storage } from "./core/utils";
import { rootReducer } from "./redux/rootReducer";
import "./sass/index.sass";

const store = createStore(rootReducer, storage("excel-state"));

store.subscribe((state) => {
  console.log("App State", state);
  storage("excel-state", state);
});

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();

document.onclick = function (e) {
  console.log(e.type);
};

document.ondblclick = function (e) {
  console.log(e.type);
};
