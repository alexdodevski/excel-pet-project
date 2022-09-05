"use strict";
import { Router } from "./core/router/Router";
import { DashboardPage } from "./pages/DashboardPage";
import { ExcelPage } from "./pages/ExcelPage";

import "./sass/index.sass";

new Router("#app", {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
