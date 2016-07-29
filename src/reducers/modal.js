import { OPEN_MODAL, CLOSE_MODAL } from '../constants';

const initialState = {
  modalVisible: false,
  modalBody: null,
  modalFooter: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modalVisible: true, modalBody: action.body, modalFooter: action.footer };
    case CLOSE_MODAL:
      return { ...state, modalVisible: false };
    default:
      return state;
  }
}
