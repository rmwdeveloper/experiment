import {
  OPEN_START_MENU, CLOSE_START_MENU, CREATE_FOLDER,
  OPEN_CONTEXT_MENU, SELECT_ICONS, CLEAR_ACTIVES, OPEN_FILE_WINDOW,
  CLOSE_FILE_WINDOW,
  MAXIMIZE_FILE_WINDOW,
  UNMAXIMIZE_FILE_WINDOW,
  MINIMIZE_FILE_WINDOW,
  UNMINIMIZE_FILE_WINDOW,
  DRAG_FILE_WINDOW,
  CLICK_TASKBAR_ITEM,
  RESIZE_FILE_WINDOW,
  RESIZE_BROWSER_WINDOW,
  INITIALIZE_BROWSER_DIMENSIONS
} from '../constants';


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

export function createFolder(location) {
  return dispatch => {
    dispatch({ type: CREATE_FOLDER, location });
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

export function openFile(nodeIndex, desktopWidth, desktopHeight) {
  return dispatch => {
    dispatch({ type: OPEN_FILE_WINDOW, nodeIndex, desktopWidth, desktopHeight });
  };
}

export function closeFile(openedFileIndex) {
  return dispatch => {
    dispatch({ type: CLOSE_FILE_WINDOW, openedFileIndex });
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

export function dragFileWindow(index, deltaX, deltaY) { // todo change this name? Same as method in windows/Desktop
  return dispatch => {
    dispatch({ type: DRAG_FILE_WINDOW, index, deltaX, deltaY });
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
