export function sortLayout(a, b) {
  return Number(a.index) - Number(b.index);
}

export function resizeWindow(resizeNode, sideClicked, deltaX, deltaY, resizeStartWidth, resizeStartHeight,
  resizeStartLeft, resizeStartTop) {
  if (sideClicked === 'topLeft') {
    if (deltaY < 0) {
      newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(deltaY);
      newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(deltaY);
    }
    if (deltaY > 0 ) {
      if (!((action.resizeStartHeight - deltaY) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight - Math.abs(deltaY);
        newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop + Math.abs(deltaY);
      }
    }
    if (deltaX < 0) {
      newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + Math.abs(deltaX);
      newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft - Math.abs(deltaX);

    }
    if (deltaX > 0 ) {
      if (!((action.resizeStartWidth - deltaX) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth - Math.abs(deltaX);
        newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft + Math.abs(deltaX);
      }
    }
  }
  else if (sideClicked === 'top') {
    if (deltaY < 0) {
      newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(deltaY);
      newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(deltaY);
    }
    if (deltaY > 0 ) {
      if (!((action.resizeStartHeight - deltaY) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight - Math.abs(deltaY);
        newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop + Math.abs(deltaY);
      }
    }
  }
  else if (sideClicked === 'right') {
    newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + deltaX;
  }
  else if (sideClicked === 'bottom') {
    newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + deltaY;
  }
  else if (sideClicked === 'left') {
    if (deltaX < 0) {
      newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + Math.abs(deltaX);
      newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft - Math.abs(deltaX);
    }
    if (deltaX > 0 ) {
      if (!((action.resizeStartHeight - deltaX) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth - Math.abs(deltaX);
        newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft + Math.abs(deltaX);
      }
    }
  }

  else if (sideClicked === 'topRight') {
    newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + deltaX;
    if (deltaY < 0) {
      newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(deltaY);
      newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(deltaY);
    }
    if (deltaY > 0 ) {
      if (!((action.resizeStartHeight - deltaY) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight - Math.abs(deltaY);
        newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop + Math.abs(deltaY);
      }
    }
  }

  else if (sideClicked === 'bottomRight') {
    newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + deltaX;
    newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + deltaY;
  }

  else if (sideClicked === 'bottomLeft') {

    newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + deltaY;

    if (deltaX < 0) {
      newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + Math.abs(deltaX);
      newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft - Math.abs(deltaX);

    }
    if (deltaX > 0 ) {
      if (!((action.resizeStartWidth - deltaX) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth - Math.abs(deltaX);
        newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft + Math.abs(deltaX);
      }
    }
  }
}