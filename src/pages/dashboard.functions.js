import { storage } from "../core/utils";

function toHTML(id) {
  const date = new Date(id);
  const model = storage(toKey(id));

  return ` <li class="dashboard__record">
              <a href="#excel/${id}">${model.title}</a>
              <strong>
              ${date.toLocaleDateString()} 
              &ensp;
              ${date.toLocaleTimeString()}
              </strong>
            </li>`;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes("excel")) continue;

    keys.push(key);
  }
  return keys;
}

function getId(key) {
  return +key.split(":")[1];
}

function toKey(id) {
  return `excel:${id}`;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) return `<p>Нет созданных таблиц</p>`;

  return `<div class="dashboard__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
          </div>
          <ul class="dashboard__list">
          ${keys
            .map(getId)
            .sort((a, b) => b - a)
            .map(toHTML)
            .join("")}
          </ul>`;
}
