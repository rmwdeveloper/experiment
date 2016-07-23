import { combineReducers } from 'redux';
import runtime from './runtime';
import stock from './stock';
import auth from './auth';
import layout from './layout';

export default combineReducers({
  runtime,
  stock,
  auth,
  layout
});
