// Pure Functions

export function capitalize(string) {
  if (typeof string != "string") {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, finish) {
  if (start > finish) {
    [finish, start] = [start, finish];
  }

  return new Array(finish - start + 1)
    .fill("")
    .map((_, index) => start + index);
}
