export function sortLayout(a, b) {
  return Number(a.index) - Number(b.index);
}

export function resizeWindow(resizeNode, sideClicked, deltaX, deltaY, resizeStartWidth, resizeStartHeight,
  resizeStartLeft, resizeStartTop) {
  if (sideClicked === 'topLeft') {
    if (deltaY < 0) {
      resizeNode.style.height = `${resizeStartHeight + Math.abs(deltaY)}px`;
      resizeNode.style.top = `${resizeStartTop - Math.abs(deltaY)}px`;
    }
    if (deltaY > 0 ) {
      if (!((resizeStartHeight - deltaY) < 200)) {
        resizeNode.style.height = `${resizeStartHeight - Math.abs(deltaY)}px`;
        resizeNode.style.top = `${resizeStartTop + Math.abs(deltaY)}px`;
      }
    }
    if (deltaX < 0) {
      resizeNode.style.width = `${resizeStartWidth + Math.abs(deltaX)}px`;
      resizeNode.style.left = `${resizeStartLeft - Math.abs(deltaX)}px`;

    }
    if (deltaX > 0 ) {
      if (!((resizeStartWidth - deltaX) < 200)) {
        resizeNode.style.width = `${resizeStartWidth - Math.abs(deltaX)}px`;
        resizeNode.style.left = `${resizeStartLeft + Math.abs(deltaX)}px`;
      }
    }
  }
  else if (sideClicked === 'top') {
    if (deltaY < 0) {
      resizeNode.style.height = `${resizeStartHeight + Math.abs(deltaY)}px`;
      resizeNode.style.top = `${resizeStartTop - Math.abs(deltaY)}px`;
    }
    if (deltaY > 0 ) {
      if (!((resizeStartHeight - deltaY) < 200)) {
        resizeNode.style.height = `${resizeStartHeight - Math.abs(deltaY)}px`;
        resizeNode.style.top = `${resizeStartTop + Math.abs(deltaY)}px`;
      }
    }
  }
  else if (sideClicked === 'right') {
    resizeNode.style.width = `${resizeStartWidth + deltaX}px`;
  }
  else if (sideClicked === 'bottom') {
    resizeNode.style.height = `${resizeStartHeight + deltaY}px`;
  }
  else if (sideClicked === 'left') {
    if (deltaX < 0) {
      resizeNode.style.width = `${resizeStartWidth + Math.abs(deltaX)}px`;
      resizeNode.style.left = `${resizeStartLeft - Math.abs(deltaX)}px`;
    }
    if (deltaX > 0 ) {
      if (!((resizeStartHeight - deltaX) < 200)) {
        resizeNode.style.width = `${resizeStartWidth - Math.abs(deltaX)}px`;
        resizeNode.style.left = `${resizeStartLeft + Math.abs(deltaX)}px`;
      }
    }
  }

  else if (sideClicked === 'topRight') {
    resizeNode.style.width = `${resizeStartWidth + deltaX}px`;
    if (deltaY < 0) {
      resizeNode.style.height = `${resizeStartHeight + Math.abs(deltaY)}px`;
      resizeNode.style.top = `${resizeStartTop - Math.abs(deltaX)}px`;
    }
    if (deltaY > 0 ) {
      if (!((resizeStartHeight - deltaY) < 200)) {
        resizeNode.style.height = `${resizeStartHeight - Math.abs(deltaY)}px`;
        resizeNode.style.top = `${resizeStartTop + Math.abs(deltaY)}px`;
      }
    }
  }

  else if (sideClicked === 'bottomRight') {
    resizeNode.style.width = `${resizeStartWidth + deltaX}px`;
    resizeNode.style.height = `${resizeStartHeight + deltaY}px`;
  }

  else if (sideClicked === 'bottomLeft') {

    resizeNode.style.height = `${resizeStartHeight + deltaY}px`;

    if (deltaX < 0) {
      resizeNode.style.width = `${resizeStartWidth + Math.abs(deltaX)}px`;
      resizeNode.style.left = `${resizeStartLeft - Math.abs(deltaX)}px`;

    }
    if (deltaX > 0 ) {
      if (!((resizeStartWidth - deltaX) < 200)) {
        resizeNode.style.width = `${resizeStartWidth - Math.abs(deltaX)}px`;
        resizeNode.style.left = `${resizeStartLeft + Math.abs(deltaX)}px`;
      }
    }
  }
}