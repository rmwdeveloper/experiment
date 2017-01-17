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
    console.log('in login action', user);
    dispatch({ type: LOGIN, user });
  };
}

export function initializeAuth(){
  return dispatch => {
    const response = fetch('/get_user', {
      method: 'get', credentials: 'include'
    }).then(response => {
      response.json().then(user => {
        dispatch({type: LOGIN, user});
      });
    });
  };
}