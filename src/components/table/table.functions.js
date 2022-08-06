export function shouldResize($el) {
  return $el.dataset.resize;
}

export function isCell($el) {
  return $el.dataset.id;
}

export function nextSelect(key, { row, col }) {
  const MIN_VALUE = 0;
  switch (key) {
    case "Enter":
    case "ArrowDown":
      row++;
      break;
    case "Tab":
    case "ArrowRight":
      col++;
      break;
    case "ArrowLeft":
      col--;
      if (col < MIN_VALUE) col = MIN_VALUE;
      break;
    case "ArrowUp":
      row--;
      if (row < MIN_VALUE) row = MIN_VALUE;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}

export function range(start, finish) {
  if (start > finish) {
    [finish, start] = [start, finish];
  }

  return new Array(finish - start + 1)
    .fill("")
    .map((_, index) => start + index);
}
