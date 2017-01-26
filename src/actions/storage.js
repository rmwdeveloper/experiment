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
export function checkAvailableSpace(newFileName, newFileExtension) {
  return dispatch => {
    dispatch({ type: CHECK_AVAILABLE_SPACE, newFileName, newFileExtension });
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
 * Update the space indicator gauge to reflect new space used.
 */
export function uploadStart(newSpaceUsed) {
  return dispatch => {
    dispatch({ type: UPLOAD_START, newSpaceUsed });
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



