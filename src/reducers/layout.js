import { SWAP_WIDGET_POSITION, ADD_COLUMN, ADD_ROW, TOGGLE_GRID } from '../constants';

const initialState = {
  columnCount: 3,
  rowCount: 3,
  gridVisible: true
  // columns: {
  //   0: { className: 'col-lg-2 col-md-2 col-sm-12 col-xs-12' },
  //   1: { className: 'col-lg-8 col-md-8 col-sm-12 col-xs-12' },
  //   2: { className: 'col-lg-2 col-md-2 col-sm-12 col-xs-12' },
  // },
  // layout: [
  //   [{ id: 0, column: 0, row: 0, widget: 0 }, { id: 1, column: 0, row: 1, widget: 1 }],
  //   [{ id: 2, column: 1, row: 0, widget: 2 }],
  //   [{ id: 3, column: 2, row: 0, widget: 3 }]
  // ]
};
export default function layout(state = initialState, action) {
  switch (action.type) {
    case SWAP_WIDGET_POSITION:
      const { layout } = state;
      const newLayout = layout.slice(0, layout.length);
      const targetWidget = action.target.widget;
      const sourceWidget = action.source.widget;
      newLayout[action.source.column][action.source.row].widget = targetWidget;
      newLayout[action.target.column][action.target.row].widget = sourceWidget;
      return { ...state, layout: newLayout };
    case ADD_COLUMN:
      return { ...state, columnCount: state.columnCount + 1 };
    case ADD_ROW:
      return { ...state, rowCount: state.rowCount + 1 };
    case TOGGLE_GRID:
      return {...state, gridVisible: !state.gridVisible};
    default:
      return state;
  }
}
