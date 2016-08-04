import {
  OPEN_START_MENU, CLOSE_START_MENU, CREATE_FOLDER,
  OPEN_CONTEXT_MENU, SELECT_ICONS
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

export function createFolder() {
  return dispatch => {
    dispatch({ type: CREATE_FOLDER });
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

