import {
  ZOOM_IN,
  ZOOM_OUT,
} from '../constants';

const initialState = {
  zoomed : false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case ZOOM_IN:
      return {...state, zoomed: true};
    case ZOOM_OUT:
      return {...state, zoomed: false};
    default:
      return state;
  }
}
