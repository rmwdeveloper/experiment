export function sortLayout(a, b) {
  return Number(a.index) - Number(b.index);
}

export function resizeWindow(resizeNode, sideClicked, deltaX, deltaY, resizeStartWidth, resizeStartHeight,
  resizeStartLeft, resizeStartTop) {
  if (sideClicked === 'topLeft') {
    if (deltaY < 0) {
      newOpenedFiles[parseInt(action.index, 10)].height = resizeStartHeight + Math.abs(deltaY);
      newOpenedFiles[parseInt(action.index, 10)].yPosition = resizeStartTop - Math.abs(deltaY);
    }
    if (deltaY > 0 ) {
      if (!((resizeStartHeight - deltaY) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].height = resizeStartHeight - Math.abs(deltaY);
        newOpenedFiles[parseInt(action.index, 10)].yPosition = resizeStartTop + Math.abs(deltaY);
      }
    }
    if (deltaX < 0) {
      newOpenedFiles[parseInt(action.index, 10)].width = resizeStartWidth + Math.abs(deltaX);
      newOpenedFiles[parseInt(action.index, 10)].xPosition = resizeStartLeft - Math.abs(deltaX);

    }
    if (deltaX > 0 ) {
      if (!((resizeStartWidth - deltaX) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].width = resizeStartWidth - Math.abs(deltaX);
        newOpenedFiles[parseInt(action.index, 10)].xPosition = resizeStartLeft + Math.abs(deltaX);
      }
    }
  }
  else if (sideClicked === 'top') {
    if (deltaY < 0) {
      newOpenedFiles[parseInt(action.index, 10)].height = resizeStartHeight + Math.abs(deltaY);
      newOpenedFiles[parseInt(action.index, 10)].yPosition = resizeStartTop - Math.abs(deltaY);
    }
    if (deltaY > 0 ) {
      if (!((resizeStartHeight - deltaY) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].height = resizeStartHeight - Math.abs(deltaY);
        newOpenedFiles[parseInt(action.index, 10)].yPosition = resizeStartTop + Math.abs(deltaY);
      }
    }
  }
  else if (sideClicked === 'right') {
    newOpenedFiles[parseInt(action.index, 10)].width = resizeStartWidth + deltaX;
  }
  else if (sideClicked === 'bottom') {
    newOpenedFiles[parseInt(action.index, 10)].height = resizeStartHeight + deltaY;
  }
  else if (sideClicked === 'left') {
    if (deltaX < 0) {
      newOpenedFiles[parseInt(action.index, 10)].width = resizeStartWidth + Math.abs(deltaX);
      newOpenedFiles[parseInt(action.index, 10)].xPosition = resizeStartLeft - Math.abs(deltaX);
    }
    if (deltaX > 0 ) {
      if (!((resizeStartHeight - deltaX) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].width = resizeStartWidth - Math.abs(deltaX);
        newOpenedFiles[parseInt(action.index, 10)].xPosition = resizeStartLeft + Math.abs(deltaX);
      }
    }
  }

  else if (sideClicked === 'topRight') {
    newOpenedFiles[parseInt(action.index, 10)].width = resizeStartWidth + deltaX;
    if (deltaY < 0) {
      newOpenedFiles[parseInt(action.index, 10)].height = resizeStartHeight + Math.abs(deltaY);
      newOpenedFiles[parseInt(action.index, 10)].yPosition = resizeStartTop - Math.abs(deltaY);
    }
    if (deltaY > 0 ) {
      if (!((resizeStartHeight - deltaY) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].height = resizeStartHeight - Math.abs(deltaY);
        newOpenedFiles[parseInt(action.index, 10)].yPosition = resizeStartTop + Math.abs(deltaY);
      }
    }
  }

  else if (sideClicked === 'bottomRight') {
    newOpenedFiles[parseInt(action.index, 10)].width = resizeStartWidth + deltaX;
    newOpenedFiles[parseInt(action.index, 10)].height = resizeStartHeight + deltaY;
  }

  else if (sideClicked === 'bottomLeft') {

    newOpenedFiles[parseInt(action.index, 10)].height = resizeStartHeight + deltaY;

    if (deltaX < 0) {
      newOpenedFiles[parseInt(action.index, 10)].width = resizeStartWidth + Math.abs(deltaX);
      newOpenedFiles[parseInt(action.index, 10)].xPosition = resizeStartLeft - Math.abs(deltaX);

    }
    if (deltaX > 0 ) {
      if (!((resizeStartWidth - deltaX) < 250)) {
        newOpenedFiles[parseInt(action.index, 10)].width = resizeStartWidth - Math.abs(deltaX);
        newOpenedFiles[parseInt(action.index, 10)].xPosition = resizeStartLeft + Math.abs(deltaX);
      }
    }
  }
}