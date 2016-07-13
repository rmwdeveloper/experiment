import axios from 'axios';
const baseURL = 'http://dev.markitondemand.com/Api/v2/';

const lookupURL = `${baseURL}Lookup`;

export async function lookupStock() {
  const response = axios.get(lookupURL).then(data => {
    console.log(data);
  }).catch(error => {
    console.log(error);
  });
}
