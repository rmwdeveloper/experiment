import { SWAP_WIDGET_POSITION, ADD_COLUMN, ADD_ROW,
  MAX_ROW, MAX_COLUMN, TOGGLE_GRID, DELETE_COLUMN, DELETE_ROW } from '../constants';

export function swapWidgetPosition(source, target) {
  return (dispatch) => {
    dispatch({ type: SWAP_WIDGET_POSITION, source, target });
  };
}

export function addColumn() {
  return (dispatch, getState) => {
    const { layout: { columnCount } } = getState();
    if (columnCount > 5) {
      dispatch({ type: MAX_COLUMN });
    } else {
      dispatch({ type: ADD_COLUMN });
    }
  };
}
export function addRow() {
  return (dispatch, getState) => {
    const { layout: { rowCount } } = getState();
    if (rowCount > 11) {
      dispatch({ type: MAX_ROW });
    } else {
      dispatch({ type: ADD_ROW });
    }
  };
}
export function deleteRow(rowNumber) {
  return (dispatch) => {
    dispatch({ type: DELETE_ROW, rowNumber });
  };
}
export function deleteColumn(columnNumber) {
  return (dispatch) => {
    dispatch({ type: DELETE_COLUMN, columnNumber });
  };
}
export function toggleGrid() {
  return dispatch => {
    dispatch({ type: TOGGLE_GRID });
  };
}
