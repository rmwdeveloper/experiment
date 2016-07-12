import { LOAD_STOCKS } from '../constants';

const initialState = {
  watchedStocks: ['AAPL']
};
export default function stock(state = initialState, action) {
  switch (action.type) {
    case LOAD_STOCKS:
      return state;
    default:
      return state;
  }
}
