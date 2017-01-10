export function sortLayout(a, b) {
  return Number(a.index) - Number(b.index);
}

export function resizeWindow(resizeNode, sideClicked, deltaX, deltaY, resizeStartWidth, resizeStartHeight,
  resizeStartLeft, resizeStartTop) {
  if (sideClicked === 'topLeft') {
    if (deltaY < 0) {
      resizeNode.styles.height = resizeStartHeight + Math.abs(deltaY);
      resizeNode.styles.yPosition = resizeStartTop - Math.abs(deltaY);
    }
    if (deltaY > 0 ) {
      if (!((resizeStartHeight - deltaY) < 250)) {
        resizeNode.styles.height = resizeStartHeight - Math.abs(deltaY);
        resizeNode.styles.yPosition = resizeStartTop + Math.abs(deltaY);
      }
    }
    if (deltaX < 0) {
      resizeNode.styles.width = resizeStartWidth + Math.abs(deltaX);
      resizeNode.styles.xPosition = resizeStartLeft - Math.abs(deltaX);

    }
    if (deltaX > 0 ) {
      if (!((resizeStartWidth - deltaX) < 250)) {
        resizeNode.styles.width = resizeStartWidth - Math.abs(deltaX);
        resizeNode.styles.xPosition = resizeStartLeft + Math.abs(deltaX);
      }
    }
  }
  else if (sideClicked === 'top') {
    if (deltaY < 0) {
      resizeNode.styles.height = resizeStartHeight + Math.abs(deltaY);
      resizeNode.styles.yPosition = resizeStartTop - Math.abs(deltaY);
    }
    if (deltaY > 0 ) {
      if (!((resizeStartHeight - deltaY) < 250)) {
        resizeNode.styles.height = resizeStartHeight - Math.abs(deltaY);
        resizeNode.styles.yPosition = resizeStartTop + Math.abs(deltaY);
      }
    }
  }
  else if (sideClicked === 'right') {
    resizeNode.styles.width = resizeStartWidth + deltaX;
  }
  else if (sideClicked === 'bottom') {
    resizeNode.styles.height = resizeStartHeight + deltaY;
  }
  else if (sideClicked === 'left') {
    if (deltaX < 0) {
      resizeNode.styles.width = resizeStartWidth + Math.abs(deltaX);
      resizeNode.styles.xPosition = resizeStartLeft - Math.abs(deltaX);
    }
    if (deltaX > 0 ) {
      if (!((resizeStartHeight - deltaX) < 250)) {
        resizeNode.styles.width = resizeStartWidth - Math.abs(deltaX);
        resizeNode.styles.xPosition = resizeStartLeft + Math.abs(deltaX);
      }
    }
  }

  else if (sideClicked === 'topRight') {
    resizeNode.styles.width = resizeStartWidth + deltaX;
    if (deltaY < 0) {
      resizeNode.styles.height = resizeStartHeight + Math.abs(deltaY);
      resizeNode.styles.yPosition = resizeStartTop - Math.abs(deltaY);
    }
    if (deltaY > 0 ) {
      if (!((resizeStartHeight - deltaY) < 250)) {
        resizeNode.styles.height = resizeStartHeight - Math.abs(deltaY);
        resizeNode.styles.yPosition = resizeStartTop + Math.abs(deltaY);
      }
    }
  }

  else if (sideClicked === 'bottomRight') {
    resizeNode.styles.width = resizeStartWidth + deltaX;
    resizeNode.styles.height = resizeStartHeight + deltaY;
  }

  else if (sideClicked === 'bottomLeft') {

    resizeNode.styles.height = resizeStartHeight + deltaY;

    if (deltaX < 0) {
      resizeNode.styles.width = resizeStartWidth + Math.abs(deltaX);
      resizeNode.styles.xPosition = resizeStartLeft - Math.abs(deltaX);

    }
    if (deltaX > 0 ) {
      if (!((resizeStartWidth - deltaX) < 250)) {
        resizeNode.styles.width = resizeStartWidth - Math.abs(deltaX);
        resizeNode.styles.xPosition = resizeStartLeft + Math.abs(deltaX);
      }
    }
  }
}