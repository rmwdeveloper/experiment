import {
  CHECK_AVAILABLE_SPACE,
  UPLOAD_COMPLETE,
  UPLOAD_START,
  UPLOAD_PROGRESS,
  UPLOAD_ERROR
} from '../constants';

/*
* Toolbar.. pop up disk space indicator and play animation.
* Add icon to desktop (or folder) with low opacity.
 */
export function checkAvailableSpace() {
  return dispatch => {
    dispatch({ type: CHECK_AVAILABLE_SPACE });
  };
}

/*
 * Continue animation, indicating that disk is full. Trigger popup asking user to buy more space.
 * Remove Icon from desktop.
 */
export function uploadError() {
  return dispatch => {
    dispatch({ type: UPLOAD_ERROR });
  };
}

/*
 * Hide the disk space indicator.
 */
export function uploadStart() {
  return dispatch => {
    dispatch({ type: UPLOAD_START });
  };
}

/*
 * Progressively increase the opacity of the new upload icon.
 * Also have an upload progress bar.
 */
export function uploadProgress() {
  return dispatch => {
    dispatch({ type: UPLOAD_PROGRESS });
  };
}


export function uploadComplete() {
  return dispatch => {
    dispatch({ type: UPLOAD_COMPLETE });
  };
}



