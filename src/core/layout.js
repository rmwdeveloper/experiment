export function sortLayout(a, b) {
  return Number(a.index) - Number(b.index);
}

export function resizeWindow(resizeNode, sideClicked, deltaX, deltaY, resizeStartWidth, resizeStartHeight,
  resizeStartLeft, resizeStartTop) {
  console.log(resizeNode, sideClicked, deltaX, deltaY, resizeStartWidth, resizeStartHeight,
    resizeStartLeft, resizeStartTop);
}