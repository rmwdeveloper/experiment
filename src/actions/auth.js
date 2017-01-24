import fetch from '../core/fetch';
import {
  TOGGLE_REGISTER_MODE,
  LOGIN,
  CLOSE_FILE_WINDOW
} from '../constants';

export function toggleRegisterMode() {
  return dispatch => {
    dispatch({ type: TOGGLE_REGISTER_MODE });
  };
}

export function login(user) {
  return (dispatch, getState) => {
    const { windows: { authenticatorIndex, openedFiles } } = getState();
    dispatch({ type: LOGIN, user });
    dispatch({ type: CLOSE_FILE_WINDOW, openedFileIndex: openedFiles.indexOf(authenticatorIndex) });
  };
}

export function initializeAuth(){
  return dispatch => {
    const response = fetch('/get_user', {
      method: 'get', credentials: 'include'
    }).then(response => {
      response.json().then(userData => {
        dispatch({type: LOGIN, user: userData});
      });
    });
  };
}