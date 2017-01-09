import {
  TOGGLE_REGISTER_MODE
} from '../constants';

const initialState = {
  registering: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_REGISTER_MODE:
      return {...state, registering: !state.registering};
    default:
      return state;
  }
}
