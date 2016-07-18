import { LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE } from '../constants';

const initialState = {
  watchedStocks: []
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
    default:
      return state;
  }
}
