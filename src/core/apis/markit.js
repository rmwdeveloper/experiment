import jsonp from 'jsonp';
import querystring from 'querystring';
const baseURL = 'http://dev.markitondemand.com/Api/v2/';

const lookupURL = `${baseURL}Lookup/`;
const quoteURL = `${baseURL}Quote/`;
const chartURL = `${baseURL}InteractiveChart/`;

function formatURL(url, parameters) {
  return `${url}/jsonp?${querystring.encode(parameters)}/`;
}
function jsonURL(url, parameters) {
  return `${url}/jsonp?parameters=${encodeURIComponent(JSON.stringify(parameters))}`;
}
export function lookupStock(query, callback) {
  const parameters = {
    input: query,
    timeout: 10000
  };
  jsonp(formatURL(lookupURL, parameters), null, callback);
}

export function getQuote(symbol, callback) {
  const parameters = {
    symbol,
    timeout: 10000
  };
  jsonp(formatURL(quoteURL, parameters), null, callback);
}

export function getChart(symbol, callback) {
  const parameters = {
    Normalized: false,
    NumberOfDays: 300,
    DataPeriod: 'Day',
    Elements: [
      {
        Symbol: symbol,
        Type: 'price',
        Params: ['ohlc']
      },
      {
        Symbol: symbol,
        Type: 'volume'
      }
    ]
  };

  jsonp(jsonURL(chartURL, parameters), null, callback);
}
