export function sortLayout(a, b) {
  return Number(a.index) - Number(b.index);
}

export function resizeWindow(resizeNode, sideClicked, deltaX, deltaY, resizeStartWidth, resizeStartHeight,
  resizeStartLeft, resizeStartTop) {
  if (action.resizeSideClicked === 'topLeft') {
    if (action.deltaY < 0) {
      newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(action.deltaY);
      newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(action.deltaY);
    }
    if (action.deltaY > 0 ) {
      if (!((action.resizeStartHeight - action.deltaY) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight - Math.abs(action.deltaY);
        newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop + Math.abs(action.deltaY);
      }
    }
    if (action.deltaX < 0) {
      newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + Math.abs(action.deltaX);
      newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft - Math.abs(action.deltaX);

    }
    if (action.deltaX > 0 ) {
      if (!((action.resizeStartWidth - action.deltaX) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth - Math.abs(action.deltaX);
        newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft + Math.abs(action.deltaX);
      }
    }
  }
  else if (action.resizeSideClicked === 'top') {
    if (action.deltaY < 0) {
      newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(action.deltaY);
      newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(action.deltaY);
    }
    if (action.deltaY > 0 ) {
      if (!((action.resizeStartHeight - action.deltaY) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight - Math.abs(action.deltaY);
        newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop + Math.abs(action.deltaY);
      }
    }
  }
  else if (action.resizeSideClicked === 'right') {
    newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + action.deltaX;
  }
  else if (action.resizeSideClicked === 'bottom') {
    newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + action.deltaY;
  }
  else if (action.resizeSideClicked === 'left') {
    if (action.deltaX < 0) {
      newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + Math.abs(action.deltaX);
      newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft - Math.abs(action.deltaX);
    }
    if (action.deltaX > 0 ) {
      if (!((action.resizeStartHeight - action.deltaX) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth - Math.abs(action.deltaX);
        newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft + Math.abs(action.deltaX);
      }
    }
  }

  else if (action.resizeSideClicked === 'topRight') {
    newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + action.deltaX;
    if (action.deltaY < 0) {
      newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(action.deltaY);
      newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(action.deltaY);
    }
    if (action.deltaY > 0 ) {
      if (!((action.resizeStartHeight - action.deltaY) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight - Math.abs(action.deltaY);
        newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop + Math.abs(action.deltaY);
      }
    }
  }

  else if (action.resizeSideClicked === 'bottomRight') {
    newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + action.deltaX;
    newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + action.deltaY;
  }

  else if (action.resizeSideClicked === 'bottomLeft') {

    newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + action.deltaY;

    if (action.deltaX < 0) {
      newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + Math.abs(action.deltaX);
      newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft - Math.abs(action.deltaX);

    }
    if (action.deltaX > 0 ) {
      if (!((action.resizeStartWidth - action.deltaX) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth - Math.abs(action.deltaX);
        newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft + Math.abs(action.deltaX);
      }
    }
  }
}