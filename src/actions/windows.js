import {
  OPEN_START_MENU, CLOSE_START_MENU, CREATE_FOLDER,
  OPEN_CONTEXT_MENU, SELECT_ICONS, CLEAR_ACTIVES, OPEN_FILE_WINDOW,
  CLOSE_FILE_WINDOW,
  MAXIMIZE_FILE_WINDOW,
  UNMAXIMIZE_FILE_WINDOW,
  MINIMIZE_FILE_WINDOW,
  UNMINIMIZE_FILE_WINDOW,
  DRAG_FILE_WINDOW,
  DRAG_ERROR_WINDOW,
  CLICK_TASKBAR_ITEM,
  RESIZE_FILE_WINDOW,
  RESIZE_BROWSER_WINDOW,
  INITIALIZE_BROWSER_DIMENSIONS,
  INITIALIZE_DESKTOP_DIMENSIONS,
  OPEN_ERROR_WINDOW,
  CLOSE_ERROR_WINDOW,
  MOVE_FILE,
  MOVE_FILES,
  DELETE_FILES
} from '../constants';

// todo rmw: Remove parameters in actions that can be gotten in state. e.g., openFile desktopWidth
//  and desktop height can be gotten from getState, doesnt need to be required as a function parameter in the
// component that uses it.
export function toggleStartMenu() {
  return (dispatch, getState) => {
    const { windows: { startMenuOpened } } = getState();
    if (startMenuOpened) {
      dispatch({ type: CLOSE_START_MENU });
    } else {
      dispatch({ type: OPEN_START_MENU });
    }
  };
}
export function closeStartMenu() {
  return dispatch => {
      dispatch({ type: CLOSE_START_MENU });
  };
}


//todo: put in <ACTION>, <ACTION_COMPLETE>, <ACTION_ERROR> for all persistent operations.
export function createFolder(location) {
  return (dispatch, getState) => {
    const { windows: { desktopNodeIndex } } = getState();
    const headers = new Headers(); // todo: abstract headers away
    headers.append('Content-Type', 'application/json');
    dispatch({ type: CREATE_FOLDER, location, desktopNodeIndex });
    fetch('/create_folder', {
      method: 'post', credentials: 'include', headers
    });
  };
}

export function selectIcons(icons) {
  return dispatch => {
    dispatch({ type: SELECT_ICONS, icons });
  };
}

export function openContextMenu(mouseX, mouseY, clickclass, index) {
  return dispatch => {
    dispatch({ type: OPEN_CONTEXT_MENU, mouseX, mouseY, clickclass, index });
  };
}

export function clearActives() {
  return dispatch => {
    dispatch({ type: CLEAR_ACTIVES });
  };
}

export function openFile(nodeIndex) {
  return (dispatch, getState) => {
    const { windows: {desktopWidth, desktopHeight} } = getState();
    dispatch({ type: OPEN_FILE_WINDOW, nodeIndex, desktopWidth, desktopHeight });
  };
}

export function closeFile(uniqueId) {
  return dispatch => {
    dispatch({ type: CLOSE_FILE_WINDOW, uniqueId });
  };
}
export function closeErrorWindow(errorIndex) {
  return dispatch => {
    dispatch({ type: CLOSE_ERROR_WINDOW, errorIndex });
  };
}
export function toggleWindowMaximize(openedFileIndex) {
  return (dispatch, getState) => {
    const { windows: { openedFiles } } = getState();
    const { maximized } = openedFiles[openedFileIndex];
    if (maximized) {
      dispatch({ type: UNMAXIMIZE_FILE_WINDOW, openedFileIndex });
    } else {
      dispatch({ type: MAXIMIZE_FILE_WINDOW, openedFileIndex });
    }
  };
}

export function toggleWindowMinimize(openedFileIndex) {
  return (dispatch, getState) => {
    const { windows: { openedFiles } } = getState();
    const { minimizedToTaskbar } = openedFiles[openedFileIndex];
    if (minimizedToTaskbar) {
      dispatch({ type: UNMINIMIZE_FILE_WINDOW, openedFileIndex });
    } else {
      dispatch({ type: MINIMIZE_FILE_WINDOW, openedFileIndex });
    }
  };
}

export function dragWindow(index, dragType, deltaX, deltaY) { // todo change this name? Same as method in windows/Desktop. (Change to dragWindow)
  return dispatch => {
    if (dragType === 'file') {
      dispatch({ type: DRAG_FILE_WINDOW, dragType, index, deltaX, deltaY });
    }
    if (dragType === 'error') {
      dispatch({ type: DRAG_ERROR_WINDOW, dragType, index, deltaX, deltaY });
    }
  };
}

export function resizeFileWindow(index, resizeSideClicked, deltaX, deltaY, resizeStartWidth, resizeStartHeight, resizeStartLeft, resizeStartTop) {
  return dispatch => {
    dispatch({ type: RESIZE_FILE_WINDOW, index, deltaX, deltaY, resizeStartWidth, resizeStartHeight, resizeStartLeft,
      resizeStartTop, resizeSideClicked });
  };
}
export function clickTaskbarItem(index) {
  return dispatch => {
    dispatch({ type: CLICK_TASKBAR_ITEM, index });
  };
}

export function resizeBrowserWindow(browserWidth, browserHeight, desktopWidth, desktopHeight) {
  return dispatch => {
    dispatch({ type: RESIZE_BROWSER_WINDOW, browserWidth, browserHeight, desktopWidth, desktopHeight});
  }
}

export function initializeBrowserDimensions(browserWidth, browserHeight) {
  return dispatch => {
    dispatch({ type: INITIALIZE_BROWSER_DIMENSIONS, browserWidth, browserHeight});
  }
}
export function initializeDesktopDimensions(desktopWidth, desktopHeight) {
  return dispatch => {
    dispatch({ type: INITIALIZE_DESKTOP_DIMENSIONS, desktopWidth, desktopHeight});
  }
}
export function openErrorWindow(errorMessage) {
  return (dispatch, getState) => {
    const { windows: {desktopWidth, desktopHeight} } = getState();
    dispatch({ type: OPEN_ERROR_WINDOW, errorMessage, desktopWidth, desktopHeight});
  }
}

export function moveFile(fromNodeIndex, toNodeIndex) {
  return (dispatch, getState) => {
    const { windows: { selectedDesktopIcons, desktopWidth, desktopHeight } } = getState();
    if (fromNodeIndex === toNodeIndex) {
      dispatch({ type: OPEN_ERROR_WINDOW, errorMessage: "Cant move a folder inside itself.", desktopWidth, desktopHeight});
      return null;
    }
    dispatch({ type: MOVE_FILE, fromNodeIndex, toNodeIndex});
  }
}

export function moveFiles(fromParentIndex, toNodeIndex) {
  return (dispatch, getState) => {
    const { windows: { selectedDesktopIcons, desktopWidth, desktopHeight } } = getState();
    const selectedIds = selectedDesktopIcons.map(id => {return parseInt(id, 10)});
    if (selectedIds.includes(toNodeIndex)) {
      dispatch({ type: OPEN_ERROR_WINDOW, errorMessage: "Cant move a folder inside itself.", desktopWidth, desktopHeight});
      return null;
    }
    dispatch({ type: MOVE_FILES, fromIndices: selectedDesktopIcons, fromParentIndex, toNodeIndex});
  }
}

//todo: put in <ACTION>, <ACTION_COMPLETE>, <ACTION_ERROR> for all persistent operations.
export function deleteFiles() {
  return (dispatch, getState) => {
    const { windows: { selectedDesktopIcons } } = getState();
    const headers = new Headers(); // todo: abstract headers away
    headers.append('Content-Type', 'application/json');
    dispatch({ type: DELETE_FILES, toDelete: selectedDesktopIcons  });
    fetch('/delete_files', {
      method: 'post', credentials: 'include', headers,
      body: JSON.stringify({toDelete: selectedDesktopIcons })
    })
  };
}
