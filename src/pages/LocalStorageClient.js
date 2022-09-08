import { storage, storageName } from "../core/utils";

export class LocalStorageClient {
  constructor(key) {
    this._key = storageName(key);
  }

  get key() {
    return this._key;
  }

  set key(value) {
    this._key = storageName(value);
  }

  async save(state) {
    return storage(this._key, state);
  }

  async get() {
    // for check loader
    return new Promise((res) => {
      setTimeout(() => res(storage(this._key)), 2000);
    });
  }
}
