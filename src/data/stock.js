/* 7 / 12 / 2016 At the time of writing this, don't really know what graphQL is*/
import fetch from '../../core/fetch';


const baseURL = 'https://ems.tradingticket.com/api/v1/';
const oAuthURL = `${baseURL}user/oAuthlink`;

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);
