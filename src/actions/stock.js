import { LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE } from '../constants';
import { lookupStock } from '../core/apis/markit';


export function loadStocks() {
  return {
    type: LOAD_STOCKS,
  };
}

export function searchStocks(query) {
  return (dispatch) => {
    dispatch({ type: SEARCH_STOCKS });
    lookupStock(query, (err, data) => {
      if (err) {
        dispatch({ type: SEARCH_STOCKS_FAILURE, err });
      } else {
        dispatch({ type: SEARCH_STOCKS_SUCCESS, data });
      }
    });
  }
}
