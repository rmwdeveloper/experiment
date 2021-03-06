import {
  LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE, CHANGE_DISPLAYED_CHART,
  TOGGLE_MODE, TOGGLE_AUTOSAVE, CACHED_SEARCH, WATCH_STOCK, GET_QUOTE, GET_QUOTE_SUCCESS,
  GET_QUOTE_FAILURE, ADD_STOCK_WIDGET, TOGGLE_EDIT_CELL_MODE, GET_CHART_SUCCESS,
} from '../constants';

const initialState = {
  watchedStocks: [],
  mode: 'layout',
  autosave: false,
  inEditMode: [],
  searches: {},
  quotes: {},
  charts: {},
  displayedChart: 'GOOG'
};
export default function stock(state = initialState, action) {
  let copy = null;
  switch (action.type) {
    case LOAD_STOCKS:
      return state;
    case SEARCH_STOCKS:
      return state;
    case TOGGLE_EDIT_CELL_MODE:
      if (state.inEditMode.includes(action.cellIndex)) {
        const index = state.inEditMode.indexOf(action.cellIndex);
        return {
          ...state, inEditMode: [...state.inEditMode.slice(0, index),
            ...state.inEditMode.slice(index + 1)]
        };
      }
      return { ...state, inEditMode: [...state.inEditMode, action.cellIndex] };
    case SEARCH_STOCKS_SUCCESS:
      copy = Object.assign({}, state.searches);
      copy[action.query] = action.data;
      return { ...state, searches: copy };
    case GET_CHART_SUCCESS:
      copy = Object.assign({}, state.charts);
      copy[action.symbol] = action.data;
      return { ...state, charts: copy };
    case CHANGE_DISPLAYED_CHART:
      return { ...state, displayedChart: action.symbol };
    case SEARCH_STOCKS_FAILURE:
      return state;
    case CACHED_SEARCH:
      return state;
    case GET_QUOTE:
      return state;
    case GET_QUOTE_SUCCESS:
      copy = Object.assign({}, state.quotes);
      copy[action.symbol] = action.data;
      return { ...state, quotes: copy };
    case GET_QUOTE_FAILURE:
      return state;
    case TOGGLE_MODE:
      return { ...state, mode: action.mode };
    case TOGGLE_AUTOSAVE:
      return { ...state, autosave: !state.autosave };
    case WATCH_STOCK:
      return { ...state, watchedStocks: [...state.watchedStocks, action.stock] };
    case ADD_STOCK_WIDGET:
      copy = Object.assign({}, state.widgets);
      copy[action.cellIndex] = { widgetType: action.widgetType };
      return { ...state, widgets: copy };
    default:
      return state;
  }
}
