import {
  ZOOM_IN,
  ZOOM_OUT,
} from '../constants';

const initialState = {
  zoomed : false,
  faceShown: ''
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case ZOOM_IN:
      return {...state, zoomed: true, faceShown: action.side };
    case ZOOM_OUT:
      return {...state, zoomed: false, faceShown: ''};
    default:
      return state;
  }
}
