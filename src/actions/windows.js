import {
  OPEN_START_MENU, CLOSE_START_MENU, CREATE_FOLDER,
  OPEN_CONTEXT_MENU, SELECT_ICONS, CLEAR_ACTIVES, OPEN_FILE_WINDOW,
  CLOSE_FILE_WINDOW,
  MAXIMIZE_FILE_WINDOW,
  MINIMIZE_FILE_WINDOW,
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

export function openContextMenu(mouseX, mouseY) {
  return dispatch => {
    dispatch({ type: OPEN_CONTEXT_MENU, mouseX, mouseY });
  };
}

export function clearActives() {
  return dispatch => {
    dispatch({ type: CLEAR_ACTIVES });
  };
}

export function openFile(entityId) {
  return dispatch => {
    dispatch({ type: OPEN_FILE_WINDOW, entityId });
  };
}

export function closeFile(openedFileIndex) {
  return dispatch => {
    dispatch({ type: CLOSE_FILE_WINDOW, openedFileIndex });
  };
}