import { LOAD_STOCKS, SEARCH_STOCKS } from '../constants';

export function loadStocks() {
  return {
    type: LOAD_STOCKS,
  };
}

export function searchStocks() {
  return {
    type: SEARCH_STOCKS
  };
}
