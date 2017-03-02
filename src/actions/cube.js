import {
  ZOOM_IN,
  ZOOM_OUT
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