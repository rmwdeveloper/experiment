import jsonp from 'jsonp';
import querystring from 'querystring';
const baseURL = 'http://dev.markitondemand.com/Api/v2/';

const lookupURL = `${baseURL}Lookup/`;
const quoteURL = `${baseURL}Quote/`;
const chartURL = `${baseURL}InteractiveChart/`;

const testURL = 'http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/jsonp?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A3650%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22AAPL%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22ohlc%22%5D%7D%2C%7B%22Symbol%22%3A%22AAPL%22%2C%22Type%22%3A%22volume%22%7D%5D%7D&_=1469059274251';
function formatURL(url, parameters) {
  return `${url}/jsonp?${querystring.encode(parameters)}/`;
}
function jsonURL(url, parameters){
  window.t0 = parameters;
  return `${url}/jsonp?parameters=${querystring.encode(JSON.stringify(parameters))}/`;
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
      DataPeriod: "Day",
      Elements: [
        {
          Symbol: symbol,
          Type: "price",
          Params: ["ohlc"]
        },
        {
          Symbol: symbol,
          Type: "volume"
        }
      ]
  };

  jsonp(testURL, null, callback);
}
