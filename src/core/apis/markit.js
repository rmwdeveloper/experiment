import jsonp from 'jsonp';
import querystring from 'querystring';
const baseURL = 'http://dev.markitondemand.com/Api/v2/';

const lookupURL = `${baseURL}Lookup/`;
const quoteURL = `${baseURL}Quote/`;

function formatURL(url, parameters) {
  return `${url}/jsonp?${querystring.encode(parameters)}/`;
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
