import { LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE, TOGGLE_MODE, TOGGLE_AUTOSAVE } from '../constants';

const initialState = {
  watchedStocks: [],
  mode: 'layout',
  autosave: false,
  columns: 3,
  cells: [{ id: 0, column: 0, row: 0 },
          { id: 1, column: 0, row: 1 },
          { id: 2, column: 1, row: 0 },
          { id: 3, column: 2, row: 0 }],
  widgets: [
    { type: 'userblock', cell: 0 },
    { type: 'ratings', cell: 1 },
    { type: 'posteditor', cell: 2 },
    { type: 'watchlist', cell: 3 }
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
