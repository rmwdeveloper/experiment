import {
  LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE, TOGGLE_MODE,
  TOGGLE_AUTOSAVE, SWAP_WIDGET_POSITION, CACHED_SEARCH, CACHE_SEARCH
} from '../constants';
import { lookupStock } from '../core/apis/markit';


export function loadStocks() {
  return {
    type: LOAD_STOCKS,
  };
}

export function searchStocks(query) {
  return (dispatch, getState) => {
    const { stock: { watchedStocks } } = getState();

    if (watchedStocks.hasOwnProperty(query)) {
      dispatch({type: CACHED_SEARCH, query});
    }
    dispatch({ type: SEARCH_STOCKS });
    lookupStock(query, (err, data) => {
      if (err) {
        dispatch({ type: SEARCH_STOCKS_FAILURE, err });
      } else {
        dispatch({type: CACHE_SEARCH, data});
        dispatch({ type: SEARCH_STOCKS_SUCCESS, data });
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