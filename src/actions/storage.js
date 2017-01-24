import {
  CHECK_AVAILABLE_SPACE,
  UPLOAD_COMPLETE,
  UPLOAD_START,
  UPLOAD_PROGRESS,
  UPLOAD_ERROR
} from '../constants';

export function checkAvailableSpace() {
  return dispatch => {
    dispatch({ type: CHECK_AVAILABLE_SPACE });
  };
}

export function uploadComplete() {
  return dispatch => {
    dispatch({ type: UPLOAD_COMPLETE });
  };
}


export function uploadStart() {
  return dispatch => {
    dispatch({ type: UPLOAD_START });
  };
}


export function uploadProgress() {
  return dispatch => {
    dispatch({ type: UPLOAD_PROGRESS });
  };
}


export function uploadError() {
  return dispatch => {
    dispatch({ type: UPLOAD_ERROR });
  };
}

