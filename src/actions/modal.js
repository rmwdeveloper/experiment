import { OPEN_MODAL, CLOSE_MODAL } from '../constants';

export function openModal(body, footer) {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL, body, footer });
  };
}

export function closeModal() {
  return (dispatch) => {
    dispatch({ type: CLOSE_MODAL });
  };
}
