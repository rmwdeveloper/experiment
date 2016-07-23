import fetch from '../fetch';

const baseURL = 'https://ems.tradingticket.com/api/v1/';

const oAuthURL = `${baseURL}user/oAuthLink`;

export async function authenticateTradeIt() {
  const response = await fetch(oAuthURL, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: 'http://localhost:3001'
    },
    body: {
      apiKey: 'tradeit-test-api-key',
      id: 'dummy',
      password: 'pass',
      broker: 'Dummy'
    }
  });
  if (response.status !== 200) throw new Error(response.statusText);
  const data = await response.json();
  console.log(data);
}
