import {
  SWAP_WIDGET_POSITION, ADD_STOCK_WIDGET, RESIZING_CELL,
  ADD_COLUMN, ADD_ROW, TOGGLE_GRID, DELETE_COLUMN, DELETE_ROW
} from '../constants';

const initialState = {
  columnCount: 1,
  rowCount: 1,
  gridVisible: true,
  layout: [[['00'], {}]],
  // layout: [[['10', '22'], { type: 'stockWidget' }], [['04', '24'], { type: 'userWidget' }],
  //     [['00', '02'], { type: 'postWidget' }], [['03'], { type: 'graphWidget' }], [['13', '23'], { type: 'alertWidget' }]],
  cells: {},
  resizingLayoutIndex: '',
  boundingBox: {}
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
      return {...state, boundingBox: action.boundingBox, resizingLayoutIndex: action.layoutIndex}
    case DELETE_ROW:
      return state;
    case TOGGLE_GRID:
      return { ...state, gridVisible: !state.gridVisible };
    default:
      return state;
  }
}
