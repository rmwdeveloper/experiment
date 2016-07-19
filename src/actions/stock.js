import {
  LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE, TOGGLE_MODE,
  TOGGLE_AUTOSAVE, SWAP_WIDGET_POSITION, CACHED_SEARCH
} from '../constants';
import { lookupStock } from '../core/apis/markit';


export function loadStocks() {
  return {
    type: LOAD_STOCKS,
  };
}

export function searchStocks(query) {
  return (dispatch, getState) => {
    const { stock: { searches } } = getState();

    if (searches.hasOwnProperty(query)) {
      dispatch({ type: CACHED_SEARCH, query });
      return null;
    }
    dispatch({ type: SEARCH_STOCKS });
    lookupStock(query, (err, data) => {
      if (err) {
        dispatch({ type: SEARCH_STOCKS_FAILURE, err });
      } else {
        dispatch({ type: SEARCH_STOCKS_SUCCESS, query, data });
      }
    });
  };
}

export function toggleMode(mode) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_MODE, mode });
  };
}

export function toggleAutosave() {
  return (dispatch) => {
    dispatch({ type: TOGGLE_AUTOSAVE });
  };
}

export function swapWidgetPosition(source, target) {
  return (dispatch) => {
    dispatch({ type: SWAP_WIDGET_POSITION, source, target });
  };
}