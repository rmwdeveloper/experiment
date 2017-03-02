import { combineReducers } from 'redux';

import runtime from './runtime';
import stock from './stock';
import auth from './auth';
import layout from './layout';
import modal from './modal';
import windows from './windows';
import storage from './storage';
import projects from './projects';
import cube from './cube';

/* Start Pagemaker reducers (Proprietary / hidden */
import widgets from '../components/Pagemaker/redux/modules/widgets';
import carousel from '../components/Pagemaker/redux/modules/carousel';
import courses from '../components/Pagemaker/redux/modules/courses';
import testimonials from '../components/Pagemaker/redux/modules/testimonials';
import instructors from '../components/Pagemaker/redux/modules/instructors';
import lectures from '../components/Pagemaker/redux/modules/lectures';
import pagemakerModal from '../components/Pagemaker/redux/modules/modal';
import dock from '../components/Pagemaker/redux/modules/dock';
import notifications from '../components/Pagemaker/redux/modules/notifications';
import customText from '../components/Pagemaker/redux/modules/customText';
import app from '../components/Pagemaker/redux/modules/app';
import widgetBackground from '../components/Pagemaker/redux/modules/widgetBackground';
import widgetHeight from '../components/Pagemaker/redux/modules/widgetHeight';
/* End Pagemaker reducers */


export default combineReducers({
  runtime,
  stock,
  auth,
  layout,
  modal,
  windows,
  storage,
  projects,
  cube,
  widgets,
  carousel,
  courses,
  testimonials,
  instructors,
  lectures,
  notifications,
  pagemakerModal,
  dock,
  customText,
  app,
  widgetBackground,
  widgetHeight
});
