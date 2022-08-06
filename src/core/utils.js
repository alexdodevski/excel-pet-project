// Pure Functions

export function capitalize(string) {
  if (typeof string != "string") {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function changeText($el, text) {
  $el.textContent = text;
}
