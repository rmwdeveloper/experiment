import { LOAD_STOCKS, SEARCH_STOCKS } from '../constants';

const initialState = {
  watchedStocks: []
};
export default function stock(state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCKS:
      return state;
    case SEARCH_STOCKS:
      return state;
    default:
      return state;
  }
}
