export class Emitter {
  constructor() {
    this.listeners = {};
  }
  // уведомляем подписчика если они есть
  emit(event, ...args) {
    if (this.listeners[event].size != 0) {
      this.listeners[event].forEach((fn) => {
        fn(...args);
      });
    } else {
      throw new Error("listeners is empty, please subscribe on event");
    }
  }

  // подписываемся на уведомление, добавляем нового подписчика
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || new Set();
    this.listeners[event].add(fn);
  }

  // отписываемся от уведомления
  unsubscribe(event, fn) {
    if (this.listeners[event].has(fn)) {
      console.log("from Emitter", event, fn);
      this.listeners[event].delete(fn);
    }
  }
}
