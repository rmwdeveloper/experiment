import {
  LOAD_STOCKS, SEARCH_STOCKS, SEARCH_STOCKS_SUCCESS, SEARCH_STOCKS_FAILURE, TOGGLE_MODE,
  TOGGLE_AUTOSAVE, CACHED_SEARCH, WATCH_STOCK, GET_QUOTE, GET_QUOTE_SUCCESS, CHANGE_DISPLAYED_CHART,
  GET_QUOTE_FAILURE, ADD_STOCK_WIDGET, TOGGLE_EDIT_CELL_MODE, GET_CHART,
  GET_CHART_SUCCESS, GET_CHART_FAILURE } from '../constants';
import { lookupStock, getQuote as gq, getChart as gc } from '../core/apis/markit';


export function toggleEditCellMode(cellIndex) {
  return dispatch => {
    dispatch({ type: TOGGLE_EDIT_CELL_MODE, cellIndex });
  };
}
export function addStockWidget(widgetType, cellIndex) {
  return dispatch => {
    dispatch({ type: ADD_STOCK_WIDGET, widgetType, cellIndex });
  };
}
export function loadStocks() {
  return {
    type: LOAD_STOCKS,
  };
}


export function getChart(symbol) {
  return (dispatch, getState) => {
    const { stock: { charts } } = getState();

    if (charts.hasOwnProperty(symbol)) {
      dispatch({ type: CACHED_SEARCH, symbol });
      return null;
    }
    dispatch({ type: GET_CHART });
    gc(symbol, (err, data) => {
      if (err) {
        dispatch({ type: GET_CHART_FAILURE, err });
      } else {
        dispatch({ type: GET_CHART_SUCCESS, symbol, data });
      }
    });
  };
}
function getChartInternal(symbol, dispatch, getState) { // eslint-disable-line
  const { stock: { charts } } = getState();

  if (charts.hasOwnProperty(symbol)) {
    dispatch({ type: CACHED_SEARCH, symbol });
    return null;
  }
  dispatch({ type: GET_CHART });
  gc(symbol, (err, data) => {
    if (err) {
      dispatch({ type: GET_CHART_FAILURE, err });
    } else {
      dispatch({ type: GET_CHART_SUCCESS, symbol, data });
    }
  });
}
export function changeDisplayedChart(symbol) {
  return (dispatch, getState) => {
    getChartInternal(symbol, dispatch, getState);
    dispatch({ type: CHANGE_DISPLAYED_CHART, symbol });
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

function getQuote(symbol, dispatch, getState) {
  const { stock: { quotes } } = getState();
  if (quotes.hasOwnProperty(symbol)) {
    dispatch({ type: CACHED_SEARCH, symbol });
    return null;
  }
  dispatch({ type: GET_QUOTE });
  gq(symbol, (err, data) => {
    if (err) {
      dispatch({ type: GET_QUOTE_FAILURE, err });
    } else {
      dispatch({ type: GET_QUOTE_SUCCESS, symbol, data });
    }
  });
}
export function watchStock(stock) {
  return (dispatch, getState) => {
    dispatch({ type: WATCH_STOCK, stock });
    getQuote(stock.Symbol, dispatch, getState);
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

