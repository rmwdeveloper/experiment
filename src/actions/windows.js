import { OPEN_START_MENU, CLOSE_START_MENU, CREATE_FOLDER } from '../constants';


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

