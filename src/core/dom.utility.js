export const DOMutility = {
  create(tagName, classes = null) {
    const el = document.createElement(tagName);
    if (classes) {
      el.classList.add(classes);
    }
    return el;
  },
  addHTML(el, html) {
    el.innerHTML = html;
  },
  clear(el) {
    this.addHTML(el, "");
  },
  getCoords(el) {
    return el.getBoundingClientRect();
  },
  addClass(el, className) {
    el.classList.add(className);
  },
  removeClass(el, className) {
    el.classList.remove(className);
  },
};
