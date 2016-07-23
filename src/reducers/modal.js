import { OPEN_MODAL, CLOSE_MODAL } from '../constants';

const initialState = {
  modalVisible: true
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modalVisible: true };
    case CLOSE_MODAL:
      return { ...state, modalVisible: false };
    default:
      return state;
  }
}
