import {
  SWAP_WIDGET_POSITION, ADD_COLUMN, ADD_ROW, RESIZING_CELL, RESIZE_COMPLETE, START_RESIZE, DEACTIVATE_MERGE_CONFIRM,
  MARK_AS_OVERLAPPED, CANCEL_MERGE,
  MAX_ROW, MAX_COLUMN, TOGGLE_GRID, DELETE_COLUMN, DELETE_ROW, MERGE_CELLS
} from '../constants';

export function swapWidgetPosition(source, target) {
  return (dispatch) => {
    dispatch({ type: SWAP_WIDGET_POSITION, source, target });
  };
}

export function addColumn() {
  return (dispatch, getState) => {
    const { layout: { columnCount } } = getState();
    if (columnCount >= 4) {
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

export function resizingCell(layoutIndex, boundingBox) {
  return dispatch => {
    dispatch({ type: RESIZING_CELL, layoutIndex, boundingBox });
  }
}

export function resizeComplete() {
  return dispatch => {
    dispatch({ type: RESIZE_COMPLETE });
  }
}
export function startResize() {
  return dispatch => {
    dispatch({ type: START_RESIZE });
  }

}

export function deactivateMergeConfirm() {
  return dispatch => {
    dispatch({ type: DEACTIVATE_MERGE_CONFIRM });
  }
}

export function mergeCells() {
  return (dispatch, getState) => {
    const { layout } = getState();
    if (layout.overlapping.length === 1) {
      dispatch({ type: CANCEL_MERGE });
      return null;
    }
    dispatch({ type: MERGE_CELLS, overlapping: layout.overlapping });
  }
}
export function markAsOverlapped(index) {
  return (dispatch, getState) => {
    const { layout } = getState();
    if (index !== layout.resizingLayoutIndex) {
      dispatch({ type: MARK_AS_OVERLAPPED, index });
    }
  }
}