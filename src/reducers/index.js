import { combineReducers } from 'redux';
import runtime from './runtime';
import stock from './stock';

export default combineReducers({
  runtime,
  stock,
});
