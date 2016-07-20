import {
  LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE,
  TOGGLE_MODE, TOGGLE_AUTOSAVE, SWAP_WIDGET_POSITION, CACHED_SEARCH, WATCH_STOCK, GET_QUOTE, GET_QUOTE_SUCCESS,
  GET_QUOTE_FAILURE
} from '../constants';

const initialState = {
  watchedStocks: [],
  mode: 'layout',
  autosave: false,
  // widgets: {
  //   0: { type: 'userblock' },
  //   1: { type: 'ratings' },
  //   2: { type: 'stockinfotable' },
  //   3: { type: 'watchlist' }
  // },
  searches: {},
  quotes: {}
};
export default function stock(state = initialState, action) {
  let copy = null;
  switch (action.type) {
    case LOAD_STOCKS:
      return state;
    case SEARCH_STOCKS:
      return state;
    case SEARCH_STOCKS_SUCCESS:
      copy = Object.assign({}, state.searches);
      copy[action.query] = action.data;
      return { ...state, searches: copy };
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
      return { ...state, watchedStocks: [...state.watchedStocks, action.stock]};
    default:
      return state;
  }
}
