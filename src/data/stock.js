import { GraphQLList as List } from 'graphql';
import fetch from '../../core/fetch';
import NewsItemType from '../types/stockType';

const baseURL = 'https://ems.tradingticket.com/api/v1/';
const oAuthURL = `${baseURL}user/oAuthlink`;

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);
