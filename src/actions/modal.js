import { OPEN_MODAL, CLOSE_MODAL } from '../constants';

export function openModal() {
  return (dispatch) => {
    dispatch({ type: OPEN_MODAL });
  };
}

export function closeModal() {
  return (dispatch) => {
    dispatch({ type: CLOSE_MODAL });
  };
}
 