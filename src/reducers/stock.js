import { LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE, TOGGLE_MODE, TOGGLE_AUTOSAVE } from '../constants';

const initialState = {
  watchedStocks: [],
  mode: 'layout',
  autosave: false
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
