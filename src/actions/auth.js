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