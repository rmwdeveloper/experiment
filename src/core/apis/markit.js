import jsonp from 'jsonp';
import querystring from 'querystring';
const baseURL = 'http://dev.markitondemand.com/Api/v2/';

const lookupURL = `${baseURL}Lookup/`;

function formatURL(url, parameters) {
  return `${url}/json?${querystring.encode(parameters)}`;
}
export async function lookupStock() {
  const parameters = {
    input: 'aa'
  };
  jsonp(formatURL(lookupURL, parameters), (err, data) => {
    if (err) {
      console.log('error', err.message);
    } else {
      console.log(data);
    }
  });
}

