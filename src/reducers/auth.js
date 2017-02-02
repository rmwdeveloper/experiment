import {
  TOGGLE_REGISTER_MODE,
  LOGIN
} from '../constants';

const initialState = {
  registering: false,
  user: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_REGISTER_MODE:
      return {...state, registering: !state.registering};
    case LOGIN:
      return {...state, user: action.user};
    default:
      return state;
  }
}
