function screenSize() {
  return document.documentElement.clientWidth;
}

function cardsCount() {
  const width = screenSize();
  if (width >= 1280) {
    return 3;
  }
  return 2;
}

export { screenSize, cardsCount };
