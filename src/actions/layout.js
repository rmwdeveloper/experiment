import { SWAP_WIDGET_POSITION, ADD_COLUMN, ADD_ROW } from '../constants';

export function swapWidgetPosition(source, target) {
  return (dispatch) => {
    dispatch({ type: SWAP_WIDGET_POSITION, source, target });
  };
}

export function addColumn() {
  return (dispatch) => {
    dispatch({ type: ADD_COLUMN });
  };
}
export function addRow() {
  return (dispatch) => {
    dispatch({ type: ADD_ROW });
  };
}
