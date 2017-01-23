import fetch from '../core/fetch';
import {
  TOGGLE_REGISTER_MODE,
  LOGIN
} from '../constants';

export function toggleRegisterMode() {
  return dispatch => {
    dispatch({ type: TOGGLE_REGISTER_MODE });
  };
}

export function login(user) {
  return dispatch => {
    dispatch({ type: LOGIN, user });
  };
}

export function initializeAuth(){
  return dispatch => {
    // const response = fetch('/get_user', {
    //   method: 'get', credentials: 'include'
    // }).then(response => {
    //   response.json().then(userData => {
    //     const { User, UserId, IndexIndicatorGroups, fileSystem, diskSpace } = userData;
    //     dispatch({type: LOGIN, user: User, UserId, IndexIndicatorGroups, fileSystem: JSON.parse(fileSystem), diskSpace});
    //   });
    // });
  };
}