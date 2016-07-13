import { LOAD_STOCKS } from '../constants';

export function loadStocks() {
  return {
    type: LOAD_STOCKS,
  };
}
