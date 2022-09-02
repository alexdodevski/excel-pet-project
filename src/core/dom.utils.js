export const DOMutils = {
  create(tagName, classes = null) {
    const el = document.createElement(tagName);
    classes ? el.classList.add(classes) : null;
    return el;
  },
  addHTML(el, html) {
    el.innerHTML = html;
  },
  getText(el) {
    return el.textContent.trim();
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
  getCellId($el) {
    const id = $el.dataset.id.split(":");
    return {
      row: +id[0],
      col: +id[1],
    };
  },
  changeText($el, text) {
    $el.textContent = text;
  },
  getStyles(styles = [], $el) {
    return styles.reduce((res, s) => {
      res[s] = $el.style[s];
      return res;
    }, {});
  },
  attr($el, name, value) {
    if (value) {
      $el.setAttribute(name, value);
    }
    $el.getAttribute(name);
  },
  parseCell(value) {
    if (value.startsWith("=")) {
      return eval(value.slice(1));
    }
    return value;
  },
};
