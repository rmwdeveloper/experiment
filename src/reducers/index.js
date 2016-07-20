import { combineReducers } from 'redux';
import runtime from './runtime';
import stock from './stock';
import auth from './auth';

export default combineReducers({
  runtime,
  stock,
  auth
});
