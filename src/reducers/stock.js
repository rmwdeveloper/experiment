import { LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE, TOGGLE_MODE, TOGGLE_AUTOSAVE } from '../constants';

const initialState = {
  watchedStocks: [],
  mode: 'layout',
  autosave: false,
  widgets: [
    { type: 'userblock', column: 0, cell: 0 },
    { type: 'ratings', column: 0, cell: 1 },
    { type: 'posteditor', column: 1, cell: 0 },
    { type: 'watchlist', column: 2, cell: 0 },
  ]
};
export default function stock(state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCKS:
      return state;
    case SEARCH_STOCKS:
      return state;
    case SEARCH_STOCKS_SUCCESS:
      return state;
    case SEARCH_STOCKS_FAILURE:
      return state;
    case TOGGLE_MODE:
      return { ...state, mode: action.mode };
    case TOGGLE_AUTOSAVE:
      return { ...state, autosave: !state.autosave };
    default:
      return state;
  }
}
