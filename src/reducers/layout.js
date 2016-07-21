import { SWAP_WIDGET_POSITION, ADD_STOCK_WIDGET,
  ADD_COLUMN, ADD_ROW, TOGGLE_GRID } from '../constants';

const initialState = {
  columnCount: 2,
  rowCount: 2,
  gridVisible: false,
  cells: {},
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
      return { ...state, columnCount: state.columnCount + 1 };
    case ADD_ROW:
      return { ...state, rowCount: state.rowCount + 1 };
    case TOGGLE_GRID:
      return { ...state, gridVisible: !state.gridVisible };
    default:
      return state;
  }
}
