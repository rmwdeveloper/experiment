import {
  CHECK_AVAILABLE_SPACE,
  UPLOAD_COMPLETE,
  UPLOAD_START,
  UPLOAD_PROGRESS,
  UPLOAD_ERROR
} from '../constants';

const initialState = {
  showSpaceIndicator: false
};

export default function storage(state = initialState, action) {
  switch (action.type) {
    case CHECK_AVAILABLE_SPACE:
      return { ...state, showSpaceIndicator: true };
    case UPLOAD_COMPLETE:
      return { ...state, showSpaceIndicator: false };
    default:
      return state;
  }
}
