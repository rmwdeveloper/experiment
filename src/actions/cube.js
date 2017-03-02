import {
  ZOOM_IN,
  ZOOM_OUT
} from '../constants';

export function zoomIn() {
  return dispatch => {
    dispatch({ type: ZOOM_IN });
  };
}

export function zoomOut() {
  return dispatch => {
    dispatch({ type: ZOOM_OUT });
  };
}