import {
  SWAP_WIDGET_POSITION, ADD_STOCK_WIDGET, RESIZING_CELL, RESIZE_COMPLETE, START_RESIZE, MARK_AS_OVERLAPPED,
  ADD_COLUMN, ADD_ROW, TOGGLE_GRID, DELETE_COLUMN, DELETE_ROW, DEACTIVATE_MERGE_CONFIRM, MERGE_CELLS,
} from '../constants';
import { sortLayout } from '../core/layout';

const initialState = {
  columnCount: 1,
  rowCount: 1,
  gridVisible: true,
  layout: [{ index: '00', rows: 1, columns: 1, data: {} }],
  overlapping: [],
  cells: {},
  resizingLayoutIndex: '',
  boundingBox: {},
  resizingInProgress: false,
  resizingDone: false,
  resizingNeedsConfirm: false,
};
export default function layout(state = initialState, action) {
  let copy = null;
  let newLayout = null;
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
        newColumnCells.push({ index: `${iterator}${state.columnCount}`, rows: 1, columns: 1, data: {} });
      }

      newLayout = state.layout.concat(newColumnCells);

      return { ...state, layout: newLayout, columnCount: state.columnCount + 1 };
    case ADD_ROW:
      const newRowCells = [];
      for (let iterator = 0; iterator < state.columnCount; iterator++) {
        newRowCells.push({index: `${state.rowCount}${iterator}`, rows: 1, columns: 1, data: {}});
      }
      newLayout = state.layout.concat(newRowCells);
      return { ...state, layout: newLayout, rowCount: state.rowCount + 1 };

    case DELETE_COLUMN:
      return state;
    case RESIZING_CELL:
      return { ...state, boundingBox: action.boundingBox, resizingLayoutIndex: action.layoutIndex };
    case RESIZE_COMPLETE:
      return { ...state, resizingInProgress: false, resizingDone: true };
    // return { ...state, resizingInProgress: false, resizingNeedsConfirm: true };
    case START_RESIZE:
      return { ...state, resizingInProgress: true, overlapping: [], resizingNeedsConfirm: false, resizingDone: false };
    case DELETE_ROW:
      return state;
    case TOGGLE_GRID:
      return { ...state, gridVisible: !state.gridVisible };
    case DEACTIVATE_MERGE_CONFIRM:
      return { ...state, resizingNeedsConfirm: false };
    case MERGE_CELLS:
      newLayout = [];
      const overlapping = [state.resizingLayoutIndex, ...action.overlapping];
      const mergedCell = [[overlapping[0], overlapping[overlapping.length - 1]], {}];
      for (let i = 0; i < state.layout.length; i++) {
        const cellIsMerged = overlapping.includes(state.layout[i][0][0]);
        if (!cellIsMerged) {
          newLayout.push(state.layout[i]);
        }
      }
      newLayout.unshift(mergedCell);
      newLayout.sort(sortLayout);
      return { ...state, layout: newLayout, resizingNeedsConfirm: false };
    case MARK_AS_OVERLAPPED:
      return { ...state, resizingNeedsConfirm: true, overlapping: state.overlapping.concat(action.index) };
    default:
      return state;
  }
}
