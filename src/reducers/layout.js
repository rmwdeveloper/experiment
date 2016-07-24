import {
  SWAP_WIDGET_POSITION, ADD_STOCK_WIDGET, RESIZING_CELL, RESIZE_COMPLETE, START_RESIZE, MARK_AS_OVERLAPPED,
  ADD_COLUMN, ADD_ROW, TOGGLE_GRID, DELETE_COLUMN, DELETE_ROW, DEACTIVATE_MERGE_CONFIRM, MERGE_CELLS,
} from '../constants';

const initialState = {
  columnCount: 1,
  rowCount: 1,
  gridVisible: true,
  layout: [[['00'], {}]],
  overlapping: [],
  cells: {},
  resizingLayoutIndex: '',
  boundingBox: {},
  resizingInProgress: false,
  resizingNeedsConfirm: false,
};
export default function layout(state = initialState, action) {
  let copy = null;
  switch (action.type) {
    case SWAP_WIDGET_POSITION: // eslint-disable-line
      const { cells } = state;
      copy = Object.assign({}, cells);
      copy[action.source.cellIndex] = cells[action.target.cellIndex];
      copy[action.target.cellIndex] = cells[action.source.cellIndex];

      return { ...state, cells: copy };
    case ADD_STOCK_WIDGET:
      copy = Object.assign({}, state.cells);
      copy[action.cellIndex] = { widgetType: action.widgetType };
      return { ...state, cells: copy };
    case ADD_COLUMN:
      const newColumnCells = [];
      for (let iterator = 0; iterator < state.rowCount; iterator++) {
        newColumnCells.push([[`${iterator}${state.columnCount}`], {}]);
      }
      return { ...state, layout: state.layout.concat(newColumnCells), columnCount: state.columnCount + 1 };
    case ADD_ROW:
      const newRowCells = [];
      for (let iterator = 0; iterator < state.columnCount; iterator++) {
        newRowCells.push([[`${state.rowCount}${iterator}`], {}]);
      }
      return { ...state, layout: state.layout.concat(newRowCells), rowCount: state.rowCount + 1 };

    case DELETE_COLUMN:
      return state;
    case RESIZING_CELL:
      return { ...state, boundingBox: action.boundingBox, resizingLayoutIndex: action.layoutIndex };
    case RESIZE_COMPLETE:
      return { ...state, resizingInProgress: false, resizingNeedsConfirm: true };
    case START_RESIZE:
      return { ...state, resizingInProgress: true, overlapping: [] };
    case DELETE_ROW:
      return state;
    case TOGGLE_GRID:
      return { ...state, gridVisible: !state.gridVisible };
    case DEACTIVATE_MERGE_CONFIRM:
      return { ...state, resizingNeedsConfirm: false};
    case MERGE_CELLS:
      return state;
    case MARK_AS_OVERLAPPED:
      return {...state, overlapping: state.overlapping.concat(action.index)};
    default:
      return state;
  }
}
