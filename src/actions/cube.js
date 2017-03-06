import {
  ZOOM_IN,
  ZOOM_OUT,
  CLOSE_MENU,
  OPEN_MENU
} from '../constants';

export function zoomIn(side) {
  return dispatch => {
    dispatch({ type: ZOOM_IN, side });
  };
}

export function zoomOut() {
  return dispatch => {
    dispatch({ type: ZOOM_OUT });
  };
}

export function closeMenu() {
  return dispatch => {
    dispatch({ type: CLOSE_MENU });
  };
}export function openMenu() {
  return dispatch => {
    dispatch({ type: OPEN_MENU });
  };
}
