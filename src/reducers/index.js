import { combineReducers } from 'redux';
import runtime from './runtime';
import stock from './stock';
import auth from './auth';
import layout from './layout';
import modal from './modal';
import windows from './windows';
import storage from './storage';
import projects from './projects';

export default combineReducers({
  runtime,
  stock,
  auth,
  layout,
  modal,
  windows,
  storage,
  projects
});
