import {
  LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE,
  TOGGLE_MODE, TOGGLE_AUTOSAVE, SWAP_WIDGET_POSITION, CACHED_SEARCH, WATCH_STOCK
} from '../constants';

const initialState = {
  watchedStocks: [],
  mode: 'layout',
  autosave: false,
  columns: {
    0: { className: 'col-lg-2 col-md-2 col-sm-12 col-xs-12' },
    1: { className: 'col-lg-8 col-md-8 col-sm-12 col-xs-12' },
    2: { className: 'col-lg-2 col-md-2 col-sm-12 col-xs-12' },
  },
  layout: [
    [{ id: 0, column: 0, row: 0, widget: 0 }, { id: 1, column: 0, row: 1, widget: 1 }],
    [{ id: 2, column: 1, row: 0, widget: 2 }],
    [{ id: 3, column: 2, row: 0, widget: 3 }]
  ],
  widgets: {
    0: { type: 'userblock' },
    1: { type: 'ratings' },
    2: { type: 'posteditor' },
    3: { type: 'watchlist' }
  },
  searches: {},
};
export default function stock(state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCKS:
      return state;
    case SEARCH_STOCKS:
      return state;
    case SEARCH_STOCKS_SUCCESS:
      const copy = Object.assign({}, state.searches);
      copy[action.query] = action.data;
      return { ...state, searches: copy };
    case SEARCH_STOCKS_FAILURE:
      return state;
    case CACHED_SEARCH:
      return state;
    case TOGGLE_MODE:
      return { ...state, mode: action.mode };
    case TOGGLE_AUTOSAVE:
      return { ...state, autosave: !state.autosave };
    case WATCH_STOCK:
      return { ...state, watchedStocks: [...state.watchedStocks, action.stock]};
    case SWAP_WIDGET_POSITION:
      const { layout } = state;
      const newLayout = layout.slice(0, layout.length);
      const targetWidget = action.target.widget;
      const sourceWidget = action.source.widget;
      newLayout[action.source.column][action.source.row].widget = targetWidget;
      newLayout[action.target.column][action.target.row].widget = sourceWidget;
      return { ...state, layout: newLayout };
    default:
      return state;
  }
}
