import {OPEN_START_MENU, CLOSE_START_MENU} from '../constants';


const initialState = {
  startMenuOpened: false
};
export default function layout(state = initialState, action) {

  switch (action.type) {
    case OPEN_START_MENU:
      return {...state, startMenuOpened: true};
    case CLOSE_START_MENU:
      return {...state, startMenuOpened: false};
    default:
      return state;
  }
}
