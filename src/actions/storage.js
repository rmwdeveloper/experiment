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
export function checkAvailableSpace(newFileName, newFileExtension, temporaryUploadId, parentIndex) {
  return dispatch => {
    dispatch({ type: CHECK_AVAILABLE_SPACE, newFileName, newFileExtension, temporaryUploadId, parentIndex });
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
export function uploadStart(newSpaceUsed, temporaryUploadId) {
  return dispatch => {
    dispatch({ type: UPLOAD_START, newSpaceUsed, temporaryUploadId });
  };
}

/*
 * Progressively increase the opacity of the new upload icon.
 * Also have an upload progress bar.
 */
export function uploadProgress(progress, temporaryUploadId) {
  return (dispatch) => {
    dispatch({ type: UPLOAD_PROGRESS, progress, temporaryUploadId });
  };
}


export function uploadComplete(temporaryUploadId, parentIndex, awsKey, extension, size) {

  return (dispatch, getState) => {
    dispatch({ type: UPLOAD_COMPLETE, temporaryUploadId, awsKey });
    
    const { windows: { fileSystem, uploads } } = getState();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const newNode = fileSystem[uploads[temporaryUploadId]];

    delete newNode.metadata.temporaryUploadId; //todo: refactor.
    delete newNode.metadata.loading;
    delete newNode.metadata.iconOpacity;
    delete newNode.metadata.progress;

    fetch('/upload_complete', {method: 'post', headers,
      body: JSON.stringify({newNode, awsKey, parentIndex, extension, size }),
      credentials: 'include'})
      .then(response => {
        return response.json().then(responseObject => {

        });
      }).catch(err => {
      return err;
    });

  };
}



