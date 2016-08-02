import querystring from 'querystring';

export default function sendFormData({username, password}) {
  const xHTTP = new XMLHttpRequest();
  const data = new FormData();
  data.username = username;
  data.password = password;
  xHTTP.onreadystatechange = function() {
    if (xHTTP.readyState === 4 ) {
      const { status, statusText, responseText } = xHTTP;
      const response = JSON.parse(xHTTP.responseText);
      if (status === 200 && statusText === 'OK') {
        // console.log(responseText);
      } else {
        // console.log('failure');
      }
    }
  };
  xHTTP.open('POST', 'register', true);
  xHTTP.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xHTTP.send(querystring.encode(data));
}