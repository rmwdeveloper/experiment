import {
  ZOOM_IN,
  ZOOM_OUT,
  CLOSE_MENU,
  OPEN_MENU
} from '../constants';

const initialState = {
  zoomed : false,
  faceShown: '',
  menuOpened: true
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case ZOOM_IN:
      return {...state, zoomed: true, faceShown: action.side };
    case ZOOM_OUT:
      return {...state, zoomed: false, faceShown: ''};
    case OPEN_MENU:
      return {...state, menuOpened: true};
    case CLOSE_MENU:
      return {...state, menuOpened: false};
    default:
      return state;
  }
}
